import React, { useState, useEffect } from 'react';
import { 
  Calendar, Star, TrendingUp, BarChart2, PlusCircle, MapPin, 
  DollarSign, Search, Bell, Sun, Moon, Filter, Clock, 
  Users, Tag, Trash2, Edit2, ChevronDown, Download, Share2 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [newEvent, setNewEvent] = useState({
    event_name: '',
    description: '',
    event_date: '',
    registrationDeadline: '',
    time: '',
    location: '',
    price: 0,
    category: 'regular',
    tags: [],
    image: '',
    totalSlots: 0,
    isPublic: true,
    status: 'upcoming'
  });

  const themeClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800';
  const componentClass = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const notifications = [
    { id: 1, message: "New registration for Tech Conference 2024", time: "2 mins ago" },
    { id: 2, message: "Upcoming event deadline: Startup Summit", time: "1 hour ago" }
  ];

  const chartData = [
    { month: 'Jan', attendees: 120, revenue: 2400 },
    { month: 'Feb', attendees: 180, revenue: 3600 },
    { month: 'Mar', attendees: 150, revenue: 3000 },
    { month: 'Apr', attendees: 200, revenue: 4000 }
  ];
   

  useEffect(() => {
    fetchEvents();
  }, [searchTerm, selectedCategory]);

  const fetchEvents = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      });
      
      const response = await fetch(`/api/events?${queryParams}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
      
      if (response.ok) {
        const savedEvent = await response.json();
        setEvents([...events, savedEvent]);
        setShowCreateEventModal(false);
        setNewEvent({
          event_name: '',
          description: '',
          event_date: '',
          registrationDeadline: '',
          time: '',
          location: '',
          price: 0,
          category: 'regular',
          tags: [],
          image: '',
          totalSlots: 0,
          isPublic: true,
          status: 'upcoming'
        });
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setEvents(events.filter(event => event._id !== eventId));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const FilterDropdown = () => (
    showFilterMenu && (
      <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${componentClass} border`}>
        <div className="py-1">
          <button 
            onClick={() => setSelectedCategory('all')} 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            All Categories
          </button>
          <button 
            onClick={() => setSelectedCategory('featured')} 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Featured
          </button>
          <button 
            onClick={() => setSelectedCategory('trending')} 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Trending
          </button>
          <button 
            onClick={() => setSelectedCategory('regular')} 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Regular
          </button>
        </div>
      </div>
    )
  );

  const NotificationsDropdown = () => (
    showNotifications && (
      <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${componentClass} border`}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-start space-x-3">
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs opacity-60">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
  

  const CreateEventModal = () => (
    showCreateEventModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className={`${componentClass} rounded-xl p-6 max-w-lg w-full`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create Event</h2>
            <button onClick={() => setShowCreateEventModal(false)} className="text-gray-500 hover:text-gray-700">
              
            </button>
          </div>
          
          <form onSubmit={handleCreateEvent} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Event Name*"
                required
                value={newEvent.event_name}
                onChange={(e) => setNewEvent({...newEvent, event_name: e.target.value})}
                className="col-span-2 p-2 rounded border"
              />
              <input
                type="date"
                required
                value={newEvent.event_date}
                onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})}
                className="p-2 rounded border"
              />
              <input
                type="time"
                required
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                className="p-2 rounded border"
              />
            </div>
  
            <textarea
              placeholder="Description*"
              required
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              className="w-full p-2 rounded border h-20"
            />
  
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Location*"
                required
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="p-2 rounded border"
              />
              <input
                type="date"
                placeholder="Registration Deadline*"
                required
                value={newEvent.registrationDeadline}
                onChange={(e) => setNewEvent({...newEvent, registrationDeadline: e.target.value})}
                className="p-2 rounded border"
              />
              <input
                type="number"
                placeholder="Total Slots*"
                required
                min="1"
                value={newEvent.totalSlots}
                onChange={(e) => setNewEvent({...newEvent, totalSlots: Number(e.target.value)})}
                className="p-2 rounded border"
              />
              <input
                type="number"
                placeholder="Price* ($)"
                required
                min="0"
                value={newEvent.price}
                onChange={(e) => setNewEvent({...newEvent, price: Number(e.target.value)})}
                className="p-2 rounded border"
              />
            </div>
  
            <select
              value={newEvent.category}
              onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
              className="w-full p-2 rounded border"
            >
              <option value="">Select Category*</option>
              <option value="regular">Regular</option>
              <option value="trending">Trending</option>
              <option value="featured">Featured</option>
            </select>
  
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={newEvent.tags.join(', ')}
              onChange={(e) => setNewEvent({...newEvent, tags: e.target.value.split(',').map(tag => tag.trim())})}
              className="w-full p-2 rounded border"
            />
  
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateEventModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  const EventCard = ({ event }) => (
    <div className={`${componentClass} border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold hover:text-indigo-500 transition-colors">
              {event.event_name}
            </h3>
            {event.earlyBird && (
              <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full mt-1 inline-block">
                Early Bird
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleDeleteEvent(event._id)}
              className="p-2 hover:bg-red-100 rounded-lg"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            <button className="p-2 hover:bg-blue-100 rounded-lg">
              <Edit2 className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>

        <p className="text-sm opacity-60 mb-4">{event.description}</p>

        <div className="space-y-3">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-red-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            <span>{new Date(event.event_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-500" />
            <span>{event.time}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm opacity-60">Price</p>
              <p className="font-bold">${event.price}</p>
            </div>
            <div>
              <p className="text-sm opacity-60">Attendees</p>
              <p className="font-bold">{event.attendees?.length || 0}/{event.totalSlots}</p>
            </div>
            <div>
              <p className="text-sm opacity-60">Status</p>
              <p className="font-bold capitalize">{event.status}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags?.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${themeClass} p-6 transition-colors duration-300`}>
      {/* Header */}
      <div className={`${componentClass} border rounded-xl p-6 mb-8`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold flex items-center ">
            <span className="text-black">event</span>
            <span className="text-blue-500">A</span> 
            <span className="ml-2">Organizer Dashboard</span>
            </h1>
          </div>
		  <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className={`pl-10 pr-4 py-2 rounded-xl border ${
                  isDarkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-100 border-gray-200'
                }`}
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <NotificationsDropdown />
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={() => setShowCreateEventModal(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`${componentClass} border rounded-xl p-6`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-60">Total Events</p>
              <h3 className="text-2xl font-bold mt-1">{events.length}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${componentClass} border rounded-xl p-6`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-60">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">
                ${events.reduce((acc, event) => acc + (event.price * (event.attendees?.length || 0)), 0).toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className={`${componentClass} border rounded-xl p-6`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-60">Total Attendees</p>
              <h3 className="text-2xl font-bold mt-1">
                {events.reduce((acc, event) => acc + (event.attendees?.length || 0), 0).toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className={`${componentClass} border rounded-xl p-6`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-60">Categories</p>
              <h3 className="text-2xl font-bold mt-1">
                {new Set(events.map(event => event.category)).size}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/10">
              <Tag className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className={`${componentClass} border rounded-xl p-6 mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Event Analytics</h3>
            <p className="text-sm opacity-60">Monthly attendees and revenue</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="attendees" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>

      {/* Modals */}
      <CreateEventModal />
      <FilterDropdown />
    </div>
  );
};

export default OrganizerDashboard;