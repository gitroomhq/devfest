import { ImageResponse } from "next/og";
import { TICKETS } from "@frontend/utils/constants";
import { auth } from "@frontend/auth";
import { getUser } from "@frontend/queries/get.user";
// App router includes @vercel/og.
// No need to install it.

async function loadGoogleFont(req: any) {
  const url = await fetch(new URL(`/fonts/bbn.ttf`, req.url).href, {
    cache: "no-store",
  });

  return url.arrayBuffer();
}

export async function GET(
  req: any,
  { params }: { params: { handle: string } },
) {
  const user = await getUser(params.handle);
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const color = [
    "#FF4836",
    "#00B976",
    "#F64F63",
    "#00A8B3",
    "#F69D18",
    "#367AFF",
  ][user.color-1];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 694,
          height: 430,
          padding: 40,
          backgroundColor: "black",
          backgroundImage:
            "url(" + new URL(`/tickets/${user.color}.png`, req.url).href + ")",
          backgroundSize: "100% 100%",
        }}
      >
        <img
          src={new URL("/svgs/LogoWithBlackText.svg", req.url).href}
          alt=""
          width={108}
          height={38}
        />
        <div
          style={{ marginTop: 42, display: "flex", flexDirection: "column" }}
        >
          <span
            style={{
              fontSize: "80px",
              display: "flex",
              flexDirection: "column",
              lineHeight: "64px",
              color: "black",
            }}
          >
            <div>{user?.name?.split?.(" ")?.[0]}</div>
            <div>{user?.name?.split?.(" ")?.[1]}</div>
          </span>
        </div>
        <div style={{ marginTop: "16px", display: "flex" }}>
          <div style={{ display: "flex" }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
              style={{ color }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9958 0.906616C9.16481 0.908085 6.42662 1.91078 4.27087 3.7354C2.11513 5.56003 0.682406 8.0876 0.228891 10.8662C-0.224624 13.6447 0.330635 16.4931 1.7954 18.902C3.26015 21.3108 5.53889 23.1231 8.22415 24.0147C8.81656 24.1247 9.0397 23.7575 9.0397 23.4453C9.0397 23.1331 9.02785 22.2279 9.0239 21.2384C5.7064 21.955 5.00538 19.8384 5.00538 19.8384C4.46431 18.464 3.68233 18.1027 3.68233 18.1027C2.60019 17.3684 3.7633 17.3821 3.7633 17.3821C4.96194 17.4665 5.59188 18.6053 5.59188 18.6053C6.65427 20.4176 8.38212 19.8934 9.06142 19.5871C9.16805 18.8194 9.47808 18.2971 9.81971 18.0006C7.16966 17.7021 4.38532 16.6851 4.38532 12.1416C4.3689 10.9633 4.80865 9.82376 5.61359 8.95881C5.49116 8.66036 5.08239 7.45479 5.7301 5.81726C5.7301 5.81726 6.73128 5.49918 9.01009 7.03265C10.9647 6.50116 13.027 6.50116 14.9816 7.03265C17.2584 5.49918 18.2576 5.81726 18.2576 5.81726C18.9073 7.45087 18.4985 8.65644 18.3761 8.95881C19.1836 9.8239 19.6243 10.9654 19.6063 12.1455C19.6063 16.6988 16.8161 17.7021 14.1621 17.9947C14.5886 18.3638 14.9697 19.0844 14.9697 20.1918C14.9697 21.7783 14.9559 23.0546 14.9559 23.4453C14.9559 23.7614 15.1711 24.1305 15.7754 24.0147C18.461 23.123 20.7399 21.3104 22.2047 18.9011C23.6694 16.4919 24.2244 13.6431 23.7703 10.8642C23.3163 8.08541 21.8829 5.55781 19.7264 3.7335C17.57 1.90919 14.8311 0.907154 11.9998 0.906616H11.9958Z"
                fill="currentColor"
              />
              <path
                d="M4.58655 17.9319C4.56088 17.9908 4.4661 18.0085 4.38908 17.9672C4.31207 17.926 4.25481 17.8494 4.28245 17.7886C4.3101 17.7277 4.40291 17.712 4.47992 17.7532C4.55694 17.7944 4.61617 17.873 4.58655 17.9319Z"
                fill="currentColor"
              />
              <path
                d="M5.07027 18.4679C5.02938 18.4884 4.98259 18.4941 4.93792 18.4841C4.89326 18.4741 4.85349 18.4489 4.82541 18.4129C4.7484 18.3305 4.73259 18.2166 4.79183 18.1655C4.85107 18.1145 4.95772 18.138 5.03473 18.2205C5.11174 18.303 5.12951 18.4169 5.07027 18.4679Z"
                fill="currentColor"
              />
              <path
                d="M5.54016 19.1492C5.46709 19.2002 5.34268 19.1492 5.27357 19.0471C5.25445 19.0288 5.23926 19.0068 5.22888 18.9825C5.21849 18.9582 5.21313 18.9321 5.21313 18.9057C5.21313 18.8793 5.21849 18.8532 5.22888 18.8289C5.23926 18.8046 5.25445 18.7827 5.27357 18.7643C5.34663 18.7153 5.47104 18.7643 5.54016 18.8645C5.60927 18.9646 5.61125 19.0981 5.54016 19.1492V19.1492Z"
                fill="currentColor"
              />
              <path
                d="M6.17809 19.809C6.11292 19.8816 5.98062 19.862 5.87201 19.7638C5.7634 19.6656 5.73772 19.5321 5.80289 19.4614C5.86805 19.3907 6.00036 19.4104 6.11292 19.5066C6.22548 19.6028 6.2472 19.7383 6.17809 19.809V19.809Z"
                fill="currentColor"
              />
              <path
                d="M7.07258 20.1937C7.04296 20.286 6.90868 20.3273 6.7744 20.288C6.64012 20.2487 6.55126 20.1388 6.57693 20.0445C6.6026 19.9503 6.73886 19.9071 6.87511 19.9503C7.01136 19.9935 7.09825 20.0975 7.07258 20.1937Z"
                fill="currentColor"
              />
              <path
                d="M8.04819 20.2605C8.04819 20.3567 7.93761 20.4391 7.79543 20.4411C7.65325 20.4431 7.53674 20.3645 7.53674 20.2683C7.53674 20.1721 7.64732 20.0896 7.7895 20.0877C7.93168 20.0857 8.04819 20.1623 8.04819 20.2605Z"
                fill="currentColor"
              />
              <path
                d="M8.9564 20.1093C8.97417 20.2055 8.87544 20.3056 8.73326 20.3292C8.59108 20.3528 8.46667 20.2958 8.4489 20.2016C8.43113 20.1073 8.53381 20.0052 8.67204 19.9797C8.81027 19.9542 8.93863 20.0131 8.9564 20.1093Z"
                fill="currentColor"
              />
            </svg>
            <div style={{ marginLeft: 8, fontSize: 25, marginTop: -3.5, color }}>
              {user.handle}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 56,
            marginLeft: 430,
            display: "flex",
            fontSize: 42,
            color: "white",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div>N</div>
            <div
              style={{
                textDecoration: "underline",
                fontSize: 30,
                marginBottom: 5,
              }}
            >
              o
            </div>
          </div>
          <div>
            {
              // @ts-ignore
              user.numericId
                ? // @ts-ignore
                  new Array(9 - user.numericId)
                    .fill(0)
                    // @ts-ignore
                    .join("") + user.numericId
                : "0000000001"
            }
          </div>
        </div>
      </div>
    ),
    {
      width: 694,
      height: 430,
      fonts: [
        {
          name: "bbn",
          data: await loadGoogleFont(req),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
