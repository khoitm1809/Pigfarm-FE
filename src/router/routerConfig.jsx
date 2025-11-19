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
            <Route
                path={ROUTES.HERD_BREED_MANAGEMENT}
                element={
                    <ProtectedRoute>
                        <HerdBreedPage />
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
                path={ROUTES.OFF_SPRING}
                element={
                    <ProtectedRoute>
                        <OffSpringPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.INVOICE}
                element={
                    <ProtectedRoute>
                        <InvoicePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.FOOD_WAREHOUSE}
                element={
                    <ProtectedRoute>
                        <FoodWarehousePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.MEDITION_WAREHOUSE}
                element={
                    <ProtectedRoute>
                        <MeditionWarehousePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.SETTINGS}
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.DETAIL_PAGE}
                element={
                    <ProtectedRoute>
                        <DetailPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.LIST_ACCOUNT}
                element={
                    <ProtectedRoute>
                        <ListAccount />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.FOOD_RATION}
                element={
                    <ProtectedRoute>
                        <FoodRationPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.DRUG_USE}
                element={
                    <ProtectedRoute>
                        <DrugUsePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.BARN_HEALTH}
                element={
                    <ProtectedRoute>
                        <BarnHealthPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.BREEDING_RECORD}
                element={
                    <ProtectedRoute>
                        <BreedingRecordPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.PROFILE}
                element={
                    <ProtectedRoute>
                        <ProfilePage />
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
            
            {/* Nếu không khớp route nào => quay về Home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};