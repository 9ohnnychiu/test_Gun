from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import json

app = FastAPI()

# Store active connections
connected_clients = set()

@app.websocket("/gun")
async def gun_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    try:
        while True:
            # Gun protocol sends JSON over the wire
            data = await websocket.receive_text()
            
            # Broadcast the incoming graph data to all OTHER connected peers
            for client in connected_clients.copy():
                if client != websocket:
                    try:
                        await client.send_text(data)
                    except Exception:
                        # Client disconnected unexpectedly while broadcasting
                        connected_clients.discard(client)
    except WebSocketDisconnect:
        connected_clients.discard(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
