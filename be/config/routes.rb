Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :v1 do
    post "login", to: "users#login"
  
    resources :users do
      get "events", on: :member, to: "users#events"
      post "events/:event_id", on: :member, to: "users#join_event"
      delete "events/:event_id", on: :member, to: "users#leave_event"
    end

    resources :events do
      get "users", on: :member, to: "events#users"
      post "users", on: :member, to: "events#add_user"
      delete "users/:user_id", on: :member, to: "events#remove_user"
    end
  end
end
