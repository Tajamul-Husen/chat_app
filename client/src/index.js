import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { SocketContextProvider } from "./contexts/socketContext";
import { ClientProfileContextProvider } from "./contexts/clientProfileContext";
import { ActiveChatContextProvider } from "./contexts/activeChatContext";
import { DisplayChatWindowContextProvider } from "./contexts/displayChatWindowContext";
import { UsersListContextProvider } from "./contexts/usersListContext";
import { UserProfileContextProvider } from "./contexts/userProfileContext";
import { ChatListContextProvider } from "./contexts/chatListContext";
import { ScrollToBottomContextProvider } from "./contexts/scrollToBottomContext";
import { MobileResponsiveContextProvider } from "./contexts/mobileResponsiveContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MobileResponsiveContextProvider>
        <ClientProfileContextProvider>
          <SocketContextProvider>
            <DisplayChatWindowContextProvider>
              <ActiveChatContextProvider>
                <UsersListContextProvider>
                  <UserProfileContextProvider>
                    <ChatListContextProvider>
                      <ScrollToBottomContextProvider>
                        <App></App>
                      </ScrollToBottomContextProvider>
                    </ChatListContextProvider>
                  </UserProfileContextProvider>
                </UsersListContextProvider>
              </ActiveChatContextProvider>
            </DisplayChatWindowContextProvider>
          </SocketContextProvider>
        </ClientProfileContextProvider>
      </MobileResponsiveContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
