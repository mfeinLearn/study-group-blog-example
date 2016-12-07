class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to posts_path
    else
      render 'new'
    end
  end

  def show
  end

  def edit
    @post.update(post_params)
  end

  def destroy
  end

  protected

    def set_post
      @post = Post.find_by_id(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :content)
    end

end
