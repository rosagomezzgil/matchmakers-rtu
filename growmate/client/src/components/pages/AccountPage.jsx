import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  // Lade gespeicherte Daten aus localStorage oder verwende Standardwerte
  const loadUserData = () => {
    const saved = localStorage.getItem('userAccountData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "",
      bio: "I love outdoor activities and meeting new people!",
      birthday: "1995-05-15",
      country: "Latvia",
      location: "Riga",
    };
  };

  const [userData, setUserData] = useState(loadUserData);
  const [saveMessage, setSaveMessage] = useState("");

  // Lade Daten beim Mount
  useEffect(() => {
    const saved = loadUserData();
    setUserData(saved);
  }, []);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Speichere in localStorage
    localStorage.setItem('userAccountData', JSON.stringify(userData));
    
    // Zeige Erfolgsmeldung
    setSaveMessage("Account settings saved successfully!");
    
    // Entferne die Meldung nach 3 Sekunden
    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
    
    // TODO: Später API call to save user data
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Account</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={userData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={userData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Birthday */}
              <div>
                <label className="block text-sm font-medium mb-1">Birthday</label>
                <input
                  type="date"
                  value={userData.birthday}
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  value={userData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={userData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-300">
          {saveMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              {saveMessage}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Save changes
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 px-6 py-3 border border-gray-400 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

