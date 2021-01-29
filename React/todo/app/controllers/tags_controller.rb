class TagsController < ApplicationController
    def index
        @tag = Tag.all
        render json: @tag
      end
    def update
      @tag = Tag.find(params[:id])
      @tag.update(tags_params)
      render json: @tag
    end
    
    def destroy
      @tag = Tag.find(params[:id])
      if @tag.destroy
        head :no_content, status: :ok
      else
        render json: @tag.errors, status: :unprocessable_entity
      end
    end
 
    def create
        @tag = Tag.new(tags_params)
        @tag.save
        render json: { status: :created, tag: @tag }
    end
    
    private

      def tags_params
          params.require(:tag).permit(:name,:description,:color,:count)
      end
end
