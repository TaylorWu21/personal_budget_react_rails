Rails.application.routes.draw do
  root 'home#index'

  #KEEP AT BOTTOM
  get '*unmatched_route', to: 'home#index'
end
