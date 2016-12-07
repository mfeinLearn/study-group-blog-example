require 'pry'
class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
    @tags = @post.tags.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save!
      redirect_to posts_path
    else
      render 'new'
    end
  end

  def show
    @comment = @post.comments.build
  end

  def edit
    @tags = @post.tags.build
  end

  def update
    if @post.update(post_params)
      redirect_to posts_path
    else
      render 'edit'
    end
  end

  def destroy
  end

  protected

    def set_post
      @post = Post.find_by_id(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :content, tag_ids: [], tags_attributes: [:name])
    end

end
