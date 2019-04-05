from tornado import websocket, web, ioloop, httpserver
import tornado
import json

session = {}
WAITING_FOR_PLAYERS = 0
GAME_IN_PROGRESS = 1
game_state = WAITING_FOR_PLAYERS

numPlayer = 0
spacesInGame = 2

class WSHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):

        #iterate through the connections
        print("-----------")
        player_address = str(self.request.remote_ip)  + ':' + str(self.stream.socket.getpeername()[1])
        session[player_address] = self
        pass

    def on_message(self, message):
        print("Original Message:", message)
        parsed_mess = json.loads(message)
        print("parsed Message:", parsed_mess)


        mess_type =  parsed_mess["type"]
        mess_data =  parsed_mess["data"]

        print(mess_type)

        if mess_type == "send_new_position":
            self.send_to_other_player(mess_data)


    def send_to_other_player(self, message):
        for key, value in session.items():
            if (key != self.get_player_address()):
                value.write_message(json.dumps(message))
        pass

    def joinGame(self):
        #iterate through the connections
        print("-----------")
        if len(session) < 2:
            player_address = str(self.request.remote_ip)  + ':' + str(self.stream.socket.getpeername()[1])
            session[player_address] = self

            for key, value in session.items():
                #if the key is not the socket the message came in on - what does that mean?
                if(key == self.get_player_address()):
                    global numPlayer
                    global spacesInGame
                    joinGameInfo = {}
                    joinGameInfo["event_type"] = "join_game_info"
                    joinGameInfo["players_number"] = numPlayer
                    session[player_address] = self
                    value.write_message(joinGameInfo)
                    numPlayer = numPlayer + 1
                    spacesInGame = spacesInGame - 1
                    lobbyGameInfo = {}
                    lobbyGameInfo["event_type"] = "lobby_game_info"
                    lobbyGameInfo["spaces_left"] = spacesInGame
                    self.send_to_other_player(lobbyGameInfo)

            print("Players so far " + str(numPlayer - 1))
            print("Spaces in game left " + str(spacesInGame))
            print("-----------")
        else:
            print("No more players")

    def on_close(self):
        try:
            ip = self.get_player_address()
            del session[ip]
            global numPlayer
            numPlayer-=1
            print( "Player ", ip, " left.")
        except:
             print( "Failed to remove.")

    def get_player_address(self):
        address = self.request.connection.context.address
        ip = address[0]
        port = str(address[1])
        ip_address = ip + ":" + port

        return ip_address

    def on_game_over(self, message):
        for value in session:
            value.write_message(json.dumps(message))
        session.clear()
        pass


settings = {"debug" :True}

app= tornado.web.Application([
    #map the handler to the URI named "test"
    (r'/wstest', WSHandler),
], settings)

if __name__ == '__main__':
    server_port=8080
    app.listen(server_port)
    ioloop.IOLoop.instance().start()
    print ("Server On")
