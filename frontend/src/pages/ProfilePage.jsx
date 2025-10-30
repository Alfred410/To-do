import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('Kalle');
  const [lastName, setLastName] = useState('Anka');
  const [email] = useState('kalle.anka@gmail.com'); // kan inte ändras

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const openDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    switch (dialogType) {
      case 'profile':
        if (!firstName.trim() || !lastName.trim()) {
          setFeedbackType('error');
          setFeedback('Förnamn och efternamn kan inte vara tomma.');
          break;
        }
        setFeedbackType('success');
        setFeedback(`Namn uppdaterat: ${firstName} ${lastName}`);
        break;

      case 'password':
        if (!currentPassword || !newPassword || !confirmPassword) {
          setFeedbackType('error');
          setFeedback('Alla lösenordsfält måste fyllas i.');
          break;
        }
        if (newPassword !== confirmPassword) {
          setFeedbackType('error');
          setFeedback('De nya lösenorden matchar inte.');
          break;
        }
        if (newPassword.length < 8) {
          setFeedbackType('error');
          setFeedback('Det nya lösenordet måste vara minst 8 tecken.');
          break;
        }
        setFeedbackType('success');
        setFeedback('Lösenord uppdaterat!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        break;

      case 'delete':
        setFeedbackType('success');
        setFeedback('Ditt konto har tagits bort.');
        break;

      default:
        break;
    }
    setDialogOpen(false);
    setTimeout(() => {
      if (!dialogOpen) setFeedback('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-lg min-h-[96vh] p-6 mt-0 sm:mt-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Konto
        </h1>

        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-1">
            Förnamn
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="block text-gray-800 font-semibold mb-1">
            Efternamn
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {dialogType === 'profile' && feedback && (
            <div
              className={`mb-4 p-2 rounded text-center ${
                feedbackType === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {feedback}
            </div>
          )}

          <button
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 transition"
            onClick={() => openDialog('profile')}
          >
            Spara ändringar
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-1">
            E-post
          </label>
          <p className="w-full p-2 border rounded-lg text-gray-800 cursor-pointer">
            {email}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-1">
            Nuvarande lösenord
          </label>
          <div className="flex items-center border rounded-lg overflow-hidden mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Nuvarande lösenord"
              className="flex-1 p-2 text-gray-800 outline-none"
            />
            <IconButton onClick={handleTogglePassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>

          <label className="block text-gray-800 font-semibold mb-1">
            Nytt lösenord
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nytt lösenord"
            className="w-full p-2 border rounded-lg mb-3"
          />

          <label className="block text-gray-800 font-semibold mb-1">
            Bekräfta nytt lösenord
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Bekräfta nytt lösenord"
            className="w-full p-2 border rounded-lg mb-4"
          />

          {dialogType === 'password' && feedback && (
            <p
              className={`mb-4 p-2 rounded text-center ${
                feedbackType === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {feedback}
            </p>
          )}

          <button
            className="w-full bg-indigo-600 text-white p-2 px-3 rounded-lg hover:bg-indigo-500 transition"
            onClick={() => openDialog('password')}
          >
            Ändra lösenord
          </button>
        </div>

        <div className="mb-6 text-center">
          <a href="#" className="text-blue-600 underline hover:text-blue-500">
            Läs vår integritetspolicy och GDPR-information
          </a>
        </div>

        <button className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 transition mb-4">
          Logga ut
        </button>

        <button
          className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition"
          onClick={() => openDialog('delete')}
        >
          Ta bort konto
        </button>

        {dialogType === 'delete' && feedback && (
          <p
            className={`mt-4 p-2 rounded text-center ${
              feedbackType === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Bekräfta ändring</DialogTitle>
        <DialogContent>
          {dialogType === 'profile' && (
            <div className="text-gray-700">
              <p>Är du säker på att du vill uppdatera namn till:</p>
              <p className="font-semibold text-gray-900 mt-2">
                {firstName} {lastName}?
              </p>
            </div>
          )}
          {dialogType === 'password' && (
            <p className="text-gray-700">
              Är du säker på att du vill ändra lösenord?
            </p>
          )}
          {dialogType === 'delete' && (
            <div className="text-red-600 font-medium">
              <p>
                Är du säker på att du vill <strong>ta bort ditt konto</strong>?
              </p>
              <p className="mt-2">Denna åtgärd går inte att ångra.</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <button
            onClick={closeDialog}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Avbryt
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg text-white transition ${
              dialogType === 'delete'
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            Bekräfta
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
