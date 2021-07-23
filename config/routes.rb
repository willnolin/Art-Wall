Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  resources :artworks
  resources :locations
  resources :users

  # get '/users/by_location/:id', to: 'user#all_by_location'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
