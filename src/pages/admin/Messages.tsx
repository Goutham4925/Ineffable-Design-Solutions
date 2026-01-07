import { useEffect, useState } from "react";
import { Eye, Trash2, Phone, Mail, Calendar } from "lucide-react";
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
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold">
        Messages
      </h1>

      {messages.length === 0 && (
        <p className="text-muted-foreground">
          No messages yet
        </p>
      )}

      {messages.map((msg) => (
        <Card
          key={msg.id}
          className={`transition ${
            !msg.read ? "border-primary/50 bg-primary/5" : ""
          }`}
        >
          <CardContent className="p-6 space-y-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="space-y-1">
                <p className="font-semibold text-lg">
                  {msg.name}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {msg.email}
                  </span>

                  {msg.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {msg.phone}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {msg.service || "General"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                {!msg.read && (
                  <Button
                    size="sm"
                    variant="secondary"
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

            {/* MESSAGE BODY */}
            <div className="border-t border-border pt-4">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {msg.message}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
