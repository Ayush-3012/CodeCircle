// components/Sidebar.tsx  (client)
"use client";
import { defaultUserImage } from "@/utils/defautUserImage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  initial,
  currentUserId,
}: {
  initial: any[];
  currentUserId: string | undefined;
}) {
  const pathname = usePathname();
  return (
    <aside className="w-72 border-r overflow-y-auto">
      {initial.map((c) => {
        const other = c.participants
          .map((p: any) => p.user)
          .find((u: any) => u.id !== currentUserId);
        const last = c.messages.at(-1);
        const active = pathname === `/chat/${c.id}`;

        return (
          <Link
            key={c.id}
            href={`/chat/${c.id}`}
            className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-700 ${
              active && "bg-gray-800"
            }`}
          >
            <Image
              src={other?.image || defaultUserImage}
              alt={other?.name}
              height={100}
              width={100}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{other?.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {last?.content ?? "No messages yet"}
              </p>
            </div>
          </Link>
        );
      })}
    </aside>
  );
}
