class TodosController < ApplicationController

  def index
        @todos = current_user.todos.all.includes(:tags).as_json(include: :tags)
        render json: @todos
  end
  
  def show
   @todos = current_user.todos.all.includes(:tags).as_json(include: :tags)
        render json: @todos
  end
  def new
    @tag=Tag.all
    @todo= Todo.new
    @todo.tag_todos.build
    render json: @tag
  end

  def create
    @todo = Todo.new(todos_params)
    @todo.save
    render json: { status: :created, todo: @todo,user_id: current_user.id }
  end
    
  def edit
    @todo = Todo.find(params[:id])
    render json: @todo  
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update(todos_params)
    render json: @todo
  end
    
  def destroy
    @todo = Todo.find(params[:id])
    if @todo.destroy
      head :no_content, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  private
    def todos_params
        params.require(:todo).permit(:id,:title, :body, :startdate,:deadline,:status,:comment,{tag_ids:[]}).merge(user_id:current_user.id)
    end
end

