class NewUserEmailMailer < ApplicationMailer
  def notify_user(user)
    @user = user
    mail(to: @user.email, from: ENV[GMAIL_USERNAME], subject: 'Welcome to Art Wall')
  end
end
