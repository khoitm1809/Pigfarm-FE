import { Route, Routes, Navigate } from "react-router";
import { ROUTES } from "./routerConstants";
import Home from "../pages/homePage";
import LoginPage from "../pages/loginPage";
import Settings from "../pages/settings/settingsPage";
import DetailPage from "../pages/DetailPage";
import ListAccount from "../pages/accountControl/listAccount";
import RegisterPage from "../pages/registerPage";
import HerdBreedPage from "../pages/herdBreedManagement/herdBreedPage";
import BarnPage from "../pages/herdBreedManagement/barnPage";
import OffSpringPage from "../pages/offSpring/offSpringPage";
import FoodWarehousePage from "../pages/warehouse/foodWarehousePage";
import MeditionWarehousePage from "../pages/warehouse/meditionWarehousePage";
import InvoicePage from "../pages/invoice/invoicePage";
import ProtectedRoute from "./ProtectedRoute";
import FoodRationPage from "../pages/foodRation/foodRationPage";
import DrugUsePage from "../pages/drugUse/drugUsePage";
import BarnHealthPage from "../pages/barnHealth/barnHealthPage";
import BreedingRecordPage from "../pages/breedingRecord/breedingRecordPage";
import ListUserPage from "../pages/users/listUserPage";
import { ProfilePage } from "../pages/profile/profilePage";
import PigPage from "../pages/pig/pigPage";

export const RouterConfig = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

            {/* Protected routes */}
            <Route
                path={ROUTES.HOME}
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            {/* Profile page */}
            <Route
                path={ROUTES.PROFILE}
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path={ROUTES.AREA}
                element={
                    <ProtectedRoute>
                        <AreaPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.BARN}
                element={
                    <ProtectedRoute>
                        <BarnPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.LIST_USER}
                element={
                    <ProtectedRoute>
                        <ListUserPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path={ROUTES.PIG_PAGE}
                element={
                    <ProtectedRoute>
                        <DetailBarnPage />
                    </ProtectedRoute>
                }
            />
            
            {/* Nếu không khớp route nào => quay về Home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};