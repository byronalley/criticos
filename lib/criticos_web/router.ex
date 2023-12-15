defmodule CriticosWeb.Router do
  use CriticosWeb, :router

  import CriticosWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {CriticosWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  pipeline :images do
    plug :accepts, ["png", "jpeg", "gif"]
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :web_api do
    plug :accepts, ["json"]
    plug :fetch_session
    # plug :protect_from_forgery
    # plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  scope "/", CriticosWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  # Web API Scope
  scope "/web_api", CriticosWeb.WebAPI, as: :web_api do
    # pipe_through [:web_api, :require_authenticated_user]
    pipe_through [:web_api]

    resources "/images", ImageController, only: [:create, :delete], param: "filename"

    get "/current_user", UserController, :current_user

    # FIXME: perms

    # post "/users/register", UserRegistrationController, :create
    post "/users/log_in", UserSessionController, :create
    delete "/users/log_out", UserSessionController, :delete
    # get "/users/reset_password", UserResetPasswordController, :new
    # post "/users/reset_password", UserResetPasswordController, :create
    # get "/users/reset_password/:token", UserResetPasswordController, :edit
    # put "/users/reset_password/:token", UserResetPasswordController, :update
  end

  scope "/web_api", CriticosWeb.WebAPI, as: :web_api do
    pipe_through :web_api

    resources "/authors", AuthorController
    resources "/books", BookController
    resources "/reviews", ReviewController
    resources "/images", ImageController, only: [:show, :index], param: "filename"
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:criticos, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: CriticosWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  ## Authentication routes

  scope "/", CriticosWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    get "/users/register", UserRegistrationController, :new
    post "/users/register", UserRegistrationController, :create
    get "/users/log_in", UserSessionController, :new
    post "/users/log_in", UserSessionController, :create
    get "/users/reset_password", UserResetPasswordController, :new
    post "/users/reset_password", UserResetPasswordController, :create
    get "/users/reset_password/:token", UserResetPasswordController, :edit
    put "/users/reset_password/:token", UserResetPasswordController, :update
  end

  scope "/", CriticosWeb do
    pipe_through [:browser, :require_authenticated_user]

    get "/users/settings", UserSettingsController, :edit
    put "/users/settings", UserSettingsController, :update
    get "/users/settings/confirm_email/:token", UserSettingsController, :confirm_email

    resources "/authors", AuthorController, except: [:show, :index]
    resources "/books", BookController, except: [:show, :index]
  end

  scope "/images", CriticosWeb do
    pipe_through [:images]

    get "/:filename", ImageController, :show
  end

  scope "/", CriticosWeb do
    pipe_through [:browser]

    delete "/users/log_out", UserSessionController, :delete
    get "/users/confirm", UserConfirmationController, :new
    post "/users/confirm", UserConfirmationController, :create
    get "/users/confirm/:token", UserConfirmationController, :edit
    post "/users/confirm/:token", UserConfirmationController, :update

    get "/authors/:id", AuthorController, :show
    get "/authors", AuthorController, :index

    get "/books/:id", BookController, :show
    get "/books", BookController, :index
  end
end
