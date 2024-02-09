class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :name, null: true
      t.string :location, null: false
      t.datetime :start_date, null: false

      t.timestamps
    end
  end
end
