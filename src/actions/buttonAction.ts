import type { ButtonAction } from "@/types/utils";
import {apiGETRequest, apiPOSTRequest} from "@/actions/apiActions";
import {useFormStore} from "@/stores/formStore";
import {useUserStore} from "@/stores/userStore";
import {useStatusStore} from "@/stores/statusStore";
import {passCheckError} from "@/actions/errorAction";

const statusStore = useStatusStore.getState();

const navigation: ButtonAction = async ({ button, navigate } ) => {
  navigate(button.route!);
}

const crud: ButtonAction = async ({ button, navigate }) => {
  statusStore.toggleLoading(true);
  const crudType = button.crudType;
  const formState = useFormStore.getState();
  const route = button.route;
  let response;
  if (crudType === 'GET') {
    response = await apiGETRequest(route);
    if (response.status === 200) {
      if (button.name === 'health-check') {
        statusStore.showStatus('success', 'Health Check', "OK");
      }
    }
    return await response.json();
  } else if (crudType === 'POST'){
    if (!await passCheckError()) {
      statusStore.toggleLoading(false);
      return;
    }
    const payload = formState.getFormParams();
    const pathname = window.location.pathname.split('/').slice(1)
    if (pathname[0] === 'reset-password' || pathname[0] === 'mfa') {
      payload.token = pathname[1];
    }
    response = await apiPOSTRequest(
      route,
      payload,
    )
    if (response.status >= 400) {
      statusStore.showStatus('error', 'Something went wrong', response.statusText);
      return;
    }
    const userState = useUserStore.getState();
    if (button.name === 'login') {
      if (response.data.code !== "") {
        navigate(`/mfa/${response.data.token}`);
      } else {
        userState.setUser(response.data);
        navigate('/');
      }
    } else if (button.name === 'signup') {
      statusStore.showStatus('success', 'Signup Successfully', 'You can now log in with your new account');
      navigate('/login');
    } else if (button.name === 'authenticate') {
      userState.setUser(response.data);
      navigate('/');
    } else if (button.name === 'logout'){
      userState.logout();
    } else if (button.name === 'forgot-password') {
      statusStore.showStatus('success', 'Successfully Submitted', 'A link was sent to you.');
      navigate('/login');
    } else if (button.name === 'reset-password') {
      statusStore.showStatus('success', 'Password Reset', 'You can now log in with your new password.');
      navigate('/login');
    }
  }
  statusStore.toggleLoading(false);
};
export const BUTTON_ACTIONS: Record<string, ButtonAction> = {
  crud,
  navigation
};