Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'posts#index'
  resources :posts
  resources :comments, only: [:create, :destroy]

  get 'posts/:id/next', to: 'posts#next'
end
