Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
  	resources :balance_sheets
  end

  #KEEP AT BOTTOM
  get '*unmatched_route', to: 'home#index'
end
