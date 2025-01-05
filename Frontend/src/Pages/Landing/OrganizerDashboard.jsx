import { useState } from "react";
import { Menu, Plus, List, BarChart3, Settings, HelpCircle, Bell, LogOut, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const OrganizerDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/loginsignup";
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    const eventData = {
      event_name: event.target.event_name.value,
      description: event.target.description.value,
      event_date: event.target.event_date.value,
      registrationDeadline: event.target.registrationDeadline.value,
      time: event.target.time.value,
      location: event.target.location.value,
      price: event.target.price.value,
      category: event.target.category.value,
      tags: event.target.tags.value.split(",").map((tag) => tag.trim()),
      image: event.target.image.value,
      org_ID: "67738fad103ca82546f5dab2",
      totalSlots: event.target.totalSlots.value,
      isPublic: event.target.isPublic.checked,
    };

    try {
      const response = await fetch("/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Event created successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  const tabs = [
    { label: "Overview", icon: BarChart3 },
    { label: "Create Event", icon: Plus },
    { label: "My Events", icon: List },
    { label: "Settings", icon: Settings },
    { label: "Help", icon: HelpCircle },
  ];

  const analyticsData = [
    { month: 'Jan', events: 4, attendees: 120, revenue: 2400 },
    { month: 'Feb', events: 3, attendees: 98, revenue: 1800 },
    { month: 'Mar', events: 5, attendees: 150, revenue: 3200 },
    { month: 'Apr', events: 6, attendees: 200, revenue: 4000 },
  ];

  const upcomingEvents = [
    { id: 1, name: "Tech Conference 2025", date: "Mar 15, 2025", attendees: 250, status: "Upcoming" },
    { id: 2, name: "Music Festival", date: "Apr 1, 2025", attendees: 500, status: "Open" },
    { id: 3, name: "Art Exhibition", date: "Apr 10, 2025", attendees: 150, status: "Draft" },
  ];

  const notifications = [
    { id: 1, message: "New event registration", time: "2 mins ago" },
    { id: 2, message: "Payment received", time: "1 hour ago" },
    { id: 3, message: "Event reminder", time: "2 hours ago" },
  ];

  const renderCreateEventForm = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form className="bg-white p-6 rounded-lg shadow space-y-6" onSubmit={handleCreateEvent}>
        {/* Event Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Event Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="event_name">
                Event Name
              </label>
              <input id="event_name" name="event_name" type="text" placeholder="Enter event name" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="category">
                Category
              </label>
              <select id="category" name="category" className="w-full p-2 border rounded">
                <option value="">Select a category</option>
                <option value="trending">Trending</option>
                <option value="educational">Educational</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea id="description" name="description" placeholder="Provide a detailed description of the event" className="w-full p-2 border rounded" rows="4"></textarea>
            </div>
          </div>
        </div>

        {/* Date and Time Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="event_date">
                Event Date
              </label>
              <input id="event_date" name="event_date" type="date" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="time">
                Time
              </label>
              <input id="time" name="time" type="time" className="w-full p-2 border rounded" />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block font-medium mb-1" htmlFor="registrationDeadline">
                Registration Deadline
              </label>
              <input id="registrationDeadline" name="registrationDeadline" type="date" className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        {/* Location and Pricing Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Location & Pricing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="location">
                Location
              </label>
              <input id="location" name="location" type="text" placeholder="Enter event location" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="price">
                Price (in USD)
              </label>
              <input id="price" name="price" type="number" placeholder="Enter ticket price" className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Additional Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="tags">
                Tags
              </label>
              <input id="tags" name="tags" type="text" placeholder="Add tags (e.g., books, fairs)" className="w-full p-2 border rounded" />
              <small className="text-gray-500">Separate tags with commas.</small>
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="image">
                Image URL
              </label>
              <input id="image" name="image" type="text" placeholder="Provide an image URL" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="totalSlots">
                Total Slots
              </label>
              <input id="totalSlots" name="totalSlots" type="number" placeholder="Enter total slots available" className="w-full p-2 border rounded" />
            </div>
            <div className="flex items-center">
              <input id="isPublic" name="isPublic" type="checkbox" className="mr-2" />
              <label className="font-medium" htmlFor="isPublic">
                Make this event public
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Event
        </button>
      </form>
    </div>
  );

  const renderOverviewContent = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Events</h3>
          <p className="text-2xl font-bold">18</p>
          <span className="text-green-500 text-sm">+12% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold">$11,400</p>
          <span className="text-green-500 text-sm">+8% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Attendees</h3>
          <p className="text-2xl font-bold">568</p>
          <span className="text-green-500 text-sm">+15% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Active Events</h3>
          <p className="text-2xl font-bold">7</p>
          <span className="text-blue-500 text-sm">Currently running</span>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Event Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="events" stroke="#8884d8" />
            <Line yAxisId="left" type="monotone" dataKey="attendees" stroke="#82ca9d" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Event Grid */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-gray-500">{event.date}</p>
              <p className="text-sm">Attendees: {event.attendees}</p>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                event.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                event.status === 'Open' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return renderOverviewContent();
      case "Create Event":
        return renderCreateEventForm();
      case "My Events":
        return <div>Your events will be displayed here.</div>;
      case "Settings":
        return <div>Configure your dashboard settings here.</div>;
      case "Help":
        return <div>Find answers to your questions here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar - Changed background color */}
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg text-gray-800 fixed h-screen transition-all`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-2xl font-semibold transition-all ${isSidebarOpen ? "block" : "hidden"}`}>
            Event<span className="text-blue-400">A</span>
          </h1>
          <Menu onClick={() => setSidebarOpen(!isSidebarOpen)} className="cursor-pointer" />
        </div>
        <ul className="space-y-4 mt-8">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`flex items-center space-x-3 px-6 py-2 cursor-pointer ${
                activeTab === tab.label ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              <tab.icon className="w-5 h-5" />
              <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{tab.label}</span>
            </li>
          ))}
          <li
            className="flex items-center space-x-3 px-6 py-2 cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
          </li>
        </ul>
      </div>

     {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-semibold">EventA Organizer Dashboard</h1>
              
              {/* Notification and Profile */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileDropdown(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                  >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="px-4 py-2 hover:bg-gray-50">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(!showProfileDropdown);
                      setShowNotifications(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <User className="w-6 h-6" />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Edit Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;