import { useEffect } from "react";

export const useSendMail = (url: string) => {
    
    useEffect(() => {
        const notifyVisit = async () => {
            try {
                const res = await fetch(url, {
                    method: "GET",
                });

                if (res.ok) {
                    console.log("Email notification sent!");
                } else {
                    console.error("Failed to send email notification:", res.status);
                }
            } catch (error) {
                console.error("Error sending email notification:", error);
            }
        };

        notifyVisit();
    }, [url]);
}