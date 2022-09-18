import React from 'react'
import { FAB, Portal, Provider } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ToggleSettings =({toggleBusiness})=> {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
  return (
    <Provider   
    settings={{
     icon: props => <MaterialIcon {...props} />,
     }}>
     <Portal>
     <FAB.Group
         fabStyle={{backgroundColor:'#5d5add'}}
         open={open}
         color={colors.white}
         icon={open ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
         actions={[
         {
             icon: 'logout',
             label: 'Logout',
             onPress: () => toggleBusiness(bar),
         },
         {
             
             icon:'add',
             label: 'CreateDataSet',
             onPress: () => toggleBusiness(restaurant),
         },
         ]}
         onStateChange={onStateChange}
         onPress={() => {
         if (open) {
             // do something if the speed dial is open
         }
         }}
     />
     </Portal>
 </Provider>
  )
}

export default ToggleSettings;