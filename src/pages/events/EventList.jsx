import React from 'react';

const EventList = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
      {events.map((event) => (
        <div key={event._id} className="card rounded-lg shadow-md overflow-hidden">
          <img
            src={event.company.logo?.url}
            alt={event.company.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
            <p className="text-gray-600 mt-2">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-gray-600 mt-4 font-semibold">{event.company.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
