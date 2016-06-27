class Api::BalanceSheetsController < ApplicationController
	before_action :balance, except: [:index, :create]
	before_action :balance_sheet_params, only: :create

	def index
		render json: BalanceSheet.all
	end

	def show
		render json: @balance
	end

	def update
		if @balance.update(balance_sheet_params)
			render json: @balance.reload
		else
			render json: {errors: @balance.errors.full_messages}
		end
	end

	def create
		balance_sheet = BalanceSheet.new(balance_sheet_params)
		if balance_sheet.save
			render json: balance_sheet
		else
			render json: { errors: balance_sheet.errors }
		end
	end

	def destroy
		@balance.destroy
		render json: true
	end

	private
		def balance_sheet_params
			params.require(:balance_sheet).permit(:item, :amount)
		end

		def balance
			@balance = BalanceSheet.find_by(id: params[:id])
		end

end