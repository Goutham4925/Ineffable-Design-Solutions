import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const token = localStorage.getItem("admin_token");

  const fetchMessages = async () => {
    const res = await fetch(`${API_BASE}/api/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessages(await res.json());
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id: string) => {
    await fetch(`${API_BASE}/api/contact/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMessages();
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`${API_BASE}/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">
        Messages
      </h1>

      {messages.map((msg) => (
        <Card key={msg.id}>
          <CardContent className="p-6 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {msg.name} • {msg.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {msg.service || "General"} •{" "}
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                {!msg.read && (
                  <Button
                    size="sm"
                    onClick={() => markRead(msg.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Mark read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMsg(msg.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm">{msg.message}</p>
          </CardContent>
        </Card>
      ))}

      {messages.length === 0 && (
        <p className="text-muted-foreground">
          No messages yet
        </p>
      )}
    </div>
  );
}
