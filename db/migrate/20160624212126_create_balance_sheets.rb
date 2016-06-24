class CreateBalanceSheets < ActiveRecord::Migration
  def change
    create_table :balance_sheets do |t|
      t.string :item
      t.integer :amount

      t.timestamps null: false
    end
  end
end
