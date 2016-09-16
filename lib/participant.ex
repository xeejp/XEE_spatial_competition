defmodule SpatialCompetition.Participant do
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def submit_town(data, id, selected_town) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    pair_turn = get_in(data, [:pairs, pair_id, :pair_turn])
    case pair_turn do
      1 -> submit_town1(data, pair_id, selected_town)
      2 -> submit_town2(data, pair_id, selected_town)
    end
  end

  def submit_town1(data, pair_id, selected_town) do
    data
    |> put_in([:pairs, pair_id, :selected_town], selected_town)
    |> put_in([:pairs, pair_id, :pair_turn], 2)
    |> put_in([:results], Map.merge(get_in(data, [:results]), %{
        pair_id => Map.merge(get_in(data, [:results,
           pair_id]) || %{}, %{
            shopA: selected_town
          })
       })
    )
  end

  def submit_town2(data, pair_id, selected_town) do
    shopA = Enum.at(get_in(data, [:pairs, pair_id, :members]), 0)
    shopB = Enum.at(get_in(data, [:pairs, pair_id, :members]), 1)
    pair_selected_town = get_in(data, [:pairs, pair_id, :selected_town])
    town_demand = get_in(data, [:town_demand])
    data
    |> put_in([:pairs, pair_id, :pair_state], "finished")
    |> put_in([:results], Map.merge(get_in(data, [:results]), %{
        pair_id => Map.merge(get_in(data, [:results,
           pair_id]) || %{}, %{
            shopB: selected_town
          })
       })
    )
    |> put_in([:participants, shopA, :point], calcPoint(pair_selected_town, selected_town, town_demand))
    |> put_in([:participants, shopB, :point], calcPoint(selected_town, pair_selected_town, town_demand)) 
  end

  def calcPoint(my_town, enemy_town, town_demand) do
    Enum.reduce(town_demand, 0, fn({key, value}, acc) ->
      key_int = Integer.parse(key) |> elem(0)
      acc + cond do
        abs(my_town-key_int) - abs(enemy_town-key_int) == 0 -> value * 0.6
        abs(my_town-key_int) - abs(enemy_town-key_int) >  0 -> value * 0.8
        abs(my_town-key_int) - abs(enemy_town-key_int) <  0 -> value * 0.4
      end
    end)
  end

  # utils
  def get_filter(data, id) do
    pair_id = get_in(data, [:participants, id, :pair_id]) || :default
    %{
      game_page: true,
      town_demand: true,
      game_progress: true,
      pairs: %{
        pair_id => true
      },
      participants: %{
        id => true
      },
      participants_number: "participantsNumber",
      _spread: [[:participants, id], [:pairs, pair_id]]
    }
  end

  def filter_data(data, id) do
    Transmap.transform(data, get_filter(data, id), diff: false)
    |> Map.delete(:participants)
  end
end
