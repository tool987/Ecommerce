import { useEffect, useState } from "react";
import {getProfile } from "../services/AuthService";

const BASE_URL = "http://127.0.0.1:8000";

interface ProfileData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile: {
    phone: string | null;
    address: string | null;
    avatar: string | null;
  };
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Profile load error:", err);
        setError("Failed to load profile. Please login again.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center">Loading profile...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;
  if (!data) return <p className="p-10 text-center">No profile found</p>;

  const avatarUrl = data.profile.avatar
    ? `${BASE_URL}${data.profile.avatar}`
    : "https://via.placeholder.com/150";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow flex gap-6">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            {data.first_name} {data.last_name}
          </h2>

          <p className="mt-2">
            <strong>Email:</strong> {data.email}
          </p>

          <p className="mt-2">
            <strong>Phone:</strong> {data.profile.phone ?? "No phone added"}
          </p>

          <p className="mt-2">
            <strong>Address:</strong> {data.profile.address ?? "No address added"}
          </p>

          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
