Rails.application.routes.draw do
  get 'tags/new'
  post '/signup', to: 'registrations#signup'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
  get '/logged_in', to: 'sessions#logged_in?'
  resources :todos
  resources :tags
end
