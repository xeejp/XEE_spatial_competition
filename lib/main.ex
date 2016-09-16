defmodule SpatialCompetition.Main do
  alias SpatialCompetition.Host
  alias SpatialCompetition.Participant

  @pages ["waiting", "description", "experiment", "result"]
  def pages, do: @pages

  def init do
    %{
      game_page: "waiting",
      game_progress: 0,
      town_demand: %{"1" => 20,"2" =>  40,"3" =>  20,"4" =>  20},
      participants: %{},
      pairs: %{},
      results: %{},
      participants_number: 0,
    }
  end

  def new_participant do
    %{
      id: nil,
      point: 0,
      pair_id: nil,
      role: nil,
    }
  end

  def new_pair(members) do
    %{
      members: members,
      pair_turn: 1,
      selected_town: nil,
      pair_state: "during",
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()
      data
      |> put_in([:participants, id], new)
      |> Map.update!(:participants_number, fn n -> n + 1 end)
    else
      data
    end
  end

  def compute_diff(old, %{data: new} = result) do
    import Participant, only: [filter_data: 2]
    import Host, only: [filter_data: 1]

    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> JsonDiffEx.diff(filter_data(old, id), filter_data(new, id)) end)}
    end)
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end
end
