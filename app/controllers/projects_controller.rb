class ProjectsController < ApplicationController
    
  def index
    # static list of projects to test out the tree map view with
    @mock_projects = (1..10).map {|i| generate_mock_project(i) }
  end
  
  private
  
  def generate_mock_project(index)
    {:name => "Project - #{index}",
     :due => 30.days.from_now,
     :num_open_tasks => rand(50),
     :priority => :high
    }
  end
  
end
