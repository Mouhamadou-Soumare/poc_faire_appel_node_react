import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Event {
  id: number;
  nom: string;
  date: string;
  lieu: string;
  payant: boolean;
}

interface User {
  id: number;
  username: string;
  nom: string;
  prenom: string;
}

interface Presence {
  id: number;
  estPresent: boolean;
  date: string;
  User: User;
}

const AttendancePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [attendances, setAttendances] = useState<Presence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = Cookies.get('auth_token');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/presences/evenements', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  const fetchAttendances = async (eventId: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/presences/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendances(response.data);
    } catch (err) {
      setError('Failed to fetch attendances');
    }
  };

  const handleEventSelect = (eventId: number) => {
    setSelectedEvent(eventId);
    fetchAttendances(eventId);
  };

  const handleAttendanceToggle = async (presenceId: number, estPresent: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/presences/${presenceId}`,
        { estPresent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendances(attendances.map(attendance => 
        attendance.id === presenceId ? { ...attendance, estPresent: response.data.estPresent } : attendance
      ));
    } catch (err) {
      setError('Failed to update attendance');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Présences</h1>
          <p className="mt-2 text-sm text-gray-700">
            Choisir un évenement pour gérer l'assiduité
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="flex mb-4">
          {events.map(event => (
            <button
              key={event.id}
              onClick={() => handleEventSelect(event.id)}
              className="mr-2 px-4 py-2 border border-transparent rounded-md bg-cyan-600 text-white hover:bg-cyan-700"
            >
              {event.nom}
            </button>
          ))}
        </div>
        {selectedEvent && (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nom</th>
                  <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Assiduité</th>
                  <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6"><span className="sr-only">Modifier</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {attendances.map(attendance => (
                  <tr key={attendance.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {attendance.User.nom} {attendance.User.prenom}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(attendance.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={attendance.estPresent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {attendance.estPresent ? 'Présent' : 'Absent'}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleAttendanceToggle(attendance.id, !attendance.estPresent)}
                        className="text-cyan-600 hover:text-cyan-900"
                      >
                        Mettre {attendance.estPresent ? 'Absent' : 'Présent'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
