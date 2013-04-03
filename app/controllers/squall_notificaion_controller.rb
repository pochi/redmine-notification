require 'httparty'

require "pry"
require "pry-debugger"

class SquallNotificaionController < ApplicationController
  unloadable

  def index
    # reservation
    url = "http://localhost:8081/guests/1/websockets"
    res = HTTParty.post(url, body: { user_id: User.current.id })
    @auth_key = res["auth_key"]
    @guest_id = res["guest_id"]

    render :index, :layout => false
  end

  def notification
    render :notification, :layout => false
  end
end
