(function() {

  console.log("squall");

  window.WEB_SOCKET_FORCE_FLASH = true;

  this.SquallClient = (function() {
    var authenticated, auto_cancel, set_event_cb, supported_popup;

    function SquallClient(url, auth_key) {
      var self;
      this.url = url;
      this.auth_key = auth_key;
      if (WebSocket && WebSocket.loadFlashPolicyFile) {
        window.WEB_SOCKET_SWF_LOCATION = "/plugin_assets/squall_notification/javascripts/WebSocketMain.swf";
        window.WEB_SOCKET_DEBUG = true;
      }
      this.socket = new WebSocket(this.url + "?auth_key=" + this.auth_key);
      self = this;
      this.socket.onopen = function(event) {
        if (!(self.onopen != null)) {
          return false;
        }
        return self.onopen(event);
      };
      this.socket.onmessage = function(event) {
        if (!(self.onmessage != null)) {
          return false;
        }
        return self.onmessage(event);
      };
      this.socket.onerror = function(event) {
        if (!(self.onerror != null)) {
          return false;
        }
        return self.onerror(event);
      };
      this.socket.onclose = function(event) {
        if (!(self.onclose != null)) {
          return false;
        }
        return self.onclose(event);
      };
    }

    SquallClient.prototype.send = function(data) {
      if (!(this.socket != null)) {
        return false;
      }
      return this.socket.send(data);
    };

    SquallClient.prototype.close = function() {
      if (!(this.socket != null)) {
        return false;
      }
      return this.socket.close();
    };

    SquallClient.prototype.request_auth = function() {
      if (!(window.webkitNotifications != null)) {
        return false;
      }
      if (window.webkitNotifications.checkPermission() !== 0) {
        return window.webkitNotifications.requestPermission();
      }
    };

    SquallClient.prototype.popup = function(title, content, options) {
      var image_url, notify;
      if (options == null) {
        options = {};
      }
      if (!(window.webkitNotifications != null)) {
        return false;
      }
      if (!authenticated(window.webkitNotifications)) {
        if (typeof console !== "undefined" && console !== null) {
          console.log("---Not authenticated popup---");
        }
        return false;
      }
      image_url = options.image != null ? options.image : "";
      notify = window.webkitNotifications.createNotification(image_url, title, content);
      set_event_cb(notify, options);
      notify.show();
      if (options.time != null) {
        auto_cancel(notify, options.time);
      }
      return notify;
    };

    SquallClient.prototype.popupCancel = function(notify) {
      return notify != null ? notify.close() : void 0;
    };

    supported_popup = function() {
      if (window.webkitNotifications != null) {
        return true;
      }
      if (typeof console !== "undefined" && console !== null) {
        console.log("---Not supported popup---");
      }
      return false;
    };

    authenticated = function(notification) {
      if (notification.checkPermission() === 0) {
        return true;
      }
      return false;
    };

    set_event_cb = function(notify, options) {
      if (!(notify != null) || !(options != null)) {
        return false;
      }
      if (options.ondisplay != null) {
        notify.ondisplay = options.ondisplay;
      }
      if (options.onerror != null) {
        notify.onerror = options.onerror;
      }
      if (options.onclose != null) {
        return notify.onclose = options.onclose;
      }
    };

    auto_cancel = function(notify, time) {
      if (!(notify != null) || !(time != null)) {
        return false;
      }
      return setTimeout((function() {
        return notify.close();
      }), time);
    };

    return SquallClient;

  })();

}).call(this);
