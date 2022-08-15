import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import useSpotify from "../hooks/useSpotify";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <div
      className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900
     overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem]
      hidden md:inline-flex pb-36"
    >
      <div className="space-y-4">
        <button
          className="flex items-center hover:text-white space-x-2"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>Log out</p>
        </button>
        <button className="flex items-center hover:text-white space-x-2">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center hover:text-white space-x-2">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center hover:text-white space-x-2">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center hover:text-white space-x-2">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center hover:text-white space-x-2">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center hover:text-white space-x-2">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your Episodies</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlist.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
