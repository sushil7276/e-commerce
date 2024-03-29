import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State, City } from "country-state-city"
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import { saveShippingInfo } from "../../actions/cartAction";

function Shipping({ history }) {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits");
            return;
        }

        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        history.push("/order/confirm");
    }


    return (
        <>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>

                        {/* Country */}
                        <div>
                            <PublicIcon />
                            <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Country</option>
                                {Country && Country.getAllCountries().map((items) => (
                                    <option key={items.isoCode} value={items.isoCode}>{items.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* State */}
                        {country && (
                            <div>
                                <TransferWithinAStationIcon />
                                <select required value={state} onChange={(e) => setState(e.target.value)}>
                                    <option value="">State</option>
                                    {State && State.getStatesOfCountry(country).map((items) => (
                                        <option value={items.isoCode} key={items.isoCode}>{items.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {/* City */}
                        {state && (
                            <div>
                                <LocationCityIcon />
                                <select required value={city} onChange={(e) => setCity(e.target.value)}>
                                    <option value="">City</option>
                                    {/* passing 2 arguments to the getCitiesOfState function (1.country code and 2. state code) */}
                                    {City && City.getCitiesOfState(country, state).map((items) => (
                                        <option value={items.name} key={items.name}>{items.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Home Address */}
                        <div>
                            <HomeIcon />
                            <input type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>



                        {/* PinCode */}
                        <div>
                            <PinDropIcon />
                            <input type="number" placeholder="Pin Code" required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <PhoneIcon />
                            <input type="number" placeholder="Phone Number" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </div>



                        <input type="submit" value="Continue" className="shippingBtn" disabled={state ? false : true} />


                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping