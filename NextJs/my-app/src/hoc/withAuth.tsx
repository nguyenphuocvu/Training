"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import socket from "@/utils/socket";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      fetch("/home", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 401) {
            router.push("/login");
          } else {
            socket.connect();
          }
        })
        .catch(() => {
          router.push("/login");
        });

      return () => {
        socket.disconnect();
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
