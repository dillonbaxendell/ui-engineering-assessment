class AddUniqueAttendees < ActiveRecord::Migration[7.0]
  def change
    add_index :attendees, [:user_id, :event_id]
  end
end
