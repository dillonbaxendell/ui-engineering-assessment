Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :v1 do
    post "login", to: "users#login"
  
    resources :users, only: [:index, :show, :create, :destroy] do
      post "events", on: :member, to: "users#join_event"
      delete "events/:event_id", on: :member, to: "users#leave_event"
    end

    resources :events
  end
end
