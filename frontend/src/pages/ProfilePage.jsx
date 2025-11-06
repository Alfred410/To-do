import { useState, useEffect } from 'react';
import {
  getProfile,
  changeName,
  changePassword,
  deleteAccount,
} from '../services/userService';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');

  //Hämta profilinfo från databasen
  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        logout();
        return;
      }

      try {
        const data = await getProfile();
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      } catch (err) {
        console.error('Ogiltig session eller kunde inte hämta profil:', err);
        logout();
      }
    }
    fetchProfile();
  }, [user,navigate, logout]);

  //Automatisk återställning av feedback-meddelande efter 4 sekunder
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(''), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  // Hantera visning av lösenord
  const handleToggleCurrentPassword = () =>
    setShowCurrentPassword((prev) => !prev);
  const handleToggleNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleToggleConfirmedPassword = () =>
    setShowConfirmedPassword((prev) => !prev);

  // Hantera dialogöppning
  const openDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  //Hantera dialogstängning
  const closeDialog = () => {
    setDialogOpen(false);
  };

  //Bekräftelsehantering för olika dialogtyper
  const handleConfirm = async () => {
    switch (dialogType) {
      case 'profile':
        try {
          if (!firstName.trim() && !lastName.trim()) {
            await changeName(firstName, lastName);
            setFeedbackType('success');
            setFeedback('Namn borttaget');
            break;
          } else {
            await changeName(firstName, lastName);
            setFeedbackType('success');
            setFeedback(`Namn uppdaterat till: ${firstName || ''} ${lastName || ''}`);
          }
        } catch {
          setFeedbackType('error');
          setFeedback('Kunde inte uppdatera namn.');
        }
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
        try {
          await changePassword(currentPassword, newPassword);
          setFeedbackType('success');
          setFeedback('Lösenord uppdaterat!');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } catch {
          setFeedbackType('error');
          setFeedback('Kunde inte ändra lösenord.');
        }
        break;

      case 'delete':
        try {
          await deleteAccount();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login', {
            state: {
              feedback: {
                message: 'Ditt konto har tagits bort.',
                type: 'success',
              },
            },
          });
        } catch {
          setFeedbackType('error');
          setFeedback('Kunde inte ta bort konto.');
        }
        break;

      default:
        break;
    }
    setDialogOpen(false);
  };

  const inputClass =
    'w-full p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none';
  const labelClass = 'block text-gray-800 font-semibold mb-2';
  const buttonClass =
    'w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition mb-2 mt-2';
  const passwordDivClass =
    'flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-indigo-400 mb-2';
  const passwordInputClass = 'flex-1 p-2 text-gray-800 outline-none';
  const dividerClass = 'border-t border-gray-300 my-6';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-lg min-h-[96vh] p-6 sm:mt-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Konto
        </h1>

        <div className="mb-4">
          <label className={labelClass}>E-post</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-2 border rounded-lg text-gray-600 bg-gray-100 cursor-not-allowed opacity-70"
          />
        </div>

        <div className={dividerClass} />

        <div className="mb-4">
          <label className={labelClass}>Förnamn</label>
          <input
            type="text"
            className={inputClass}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className={labelClass}>Efternamn</label>
          <input
            type="text"
            className={inputClass}
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

          <button className={buttonClass} onClick={() => openDialog('profile')}>
            Spara ändringar
          </button>
        </div>

        <div className={dividerClass} />

        <div className="mb-6">
          <label className={labelClass}>Nuvarande lösenord</label>
          <div className={passwordDivClass}>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Nuvarande lösenord"
              autoComplete="current-password"
              className={passwordInputClass}
            />
            <IconButton
              onClick={handleToggleCurrentPassword}
              aria-label={
                showCurrentPassword ? 'Dölj lösenord' : 'Visa lösenord'
              }
            >
              {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>

          <label className={labelClass}>Nytt lösenord</label>
          <div className={passwordDivClass}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nytt lösenord"
              autoComplete="new-password"
              className={passwordInputClass}
            />
            <IconButton
              onClick={handleToggleNewPassword}
              aria-label={showNewPassword ? 'Dölj lösenord' : 'Visa lösenord'}
            >
              {showNewPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>

          <label className={labelClass}>Bekräfta nytt lösenord</label>
          <div className={passwordDivClass}>
            <input
              type={showConfirmedPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Bekräfta nytt lösenord"
              autoComplete="new-password"
              className={passwordInputClass}
            />
            <IconButton
              onClick={handleToggleConfirmedPassword}
              aria-label={
                showConfirmedPassword ? 'Dölj lösenord' : 'Visa lösenord'
              }
            >
              {showConfirmedPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>

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
            className={buttonClass}
            onClick={() => openDialog('password')}
          >
            Ändra lösenord
          </button>
        </div>

        <div className={dividerClass} />

        <div className="mb-10 text-center">
          <a href="#" className="text-blue-600 underline hover:text-blue-500">
            Läs vår integritetspolicy och GDPR-information
          </a>
        </div>

        <button
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 transition mb-4"
          onClick={logout}
        >
          Logga ut
        </button>

        <button
          className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition"
          onClick={() => openDialog('delete')}
        >
          Ta bort konto
        </button>
      </div>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Bekräfta ändring</DialogTitle>
        <DialogContent>
          {dialogType === 'profile' && (
            <div className="text-gray-700">
              {(!firstName.trim() && !lastName.trim()) ? (
                <>
                <p>Är du säker på att du vill ta bort ditt namn?</p>
                <p className="font-semibold text-gray-900 mt-2"> Namnet tas bort från ditt konto.</p>
                </>
              ):(
              <>
              <p>Är du säker på att du vill uppdatera namn till:</p>
              <p className="font-semibold text-gray-900 mt-2">
                {firstName} {lastName}?
              </p>
              </>
              )}
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
