import React, { useEffect } from 'react'
import { Provider, connect } from 'react-redux'
import store from './INVENTARIS/redux/store'
import ReduxContent from './reduxContent'
import Navigations from './INVENTARIS/screens/Navigations'
import Sidebar from './INVENTARIS'
import TokenModal from './INVENTARIS/components/ExpiredTokenModal'
import VendorModal from './INVENTARIS/components/SelectVendorModal'
import EmployeeModal from './INVENTARIS/components/SelectEmployeeModal'
import BarangModal from './INVENTARIS/components/SelectBarangModal'

<link rel="stylesheet"
    href="https://fonts.google.com/icons?selected=Material%20Icons%3Asearch%3A">
</link>
function ReduxProvider() {

    return (
        <Provider store={store}>
            <EmployeeModal />
            <VendorModal />
            <BarangModal />
            <TokenModal />



            <Navigations />

        </Provider>

    )
}



export default ReduxProvider;