/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
// import base64 from 'base-64';
// import axios from 'axios';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            otp: '',
            user_id: '',
            check: false,
            checkotp: false,
            errors: {},
            error: {},
        }
    }
    submit() {
        let dataSet = this.validateForm();
        if (dataSet === true) {
            this.setState({ check: true });
        }
    }
    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields) {
            formIsValid = false;
            errors.fields = '*Please enter your email-ID.';
        }
        if (typeof fields !== 'undefined') {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
            );
            if (!pattern.test(fields)) {
                formIsValid = false;
                errors.fields = '*Please enter a valid email-ID.';
            }
        }

        this.setState({
            errors: errors,
        });
        return formIsValid;
    };
    submitOTP() {
        if (this.state.otp != "") {
            this.setState({ checkotp: true });
        }

    }

    validate = () => {
        let password = this.state.password;
        let error = {};
        let formIsValid = true;
        var passPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/);
        if (!passPattern.test(password)) {
            let pass = String(this.state.password);
            if (!pass.match(/^.*(?=.*\d).*$/)) {
                formIsValid = false;
                error.password = '*Password Should contain number.';
            }
            if (!pass.match(/^.*(?=.*[a-z]).*$/)) {
                formIsValid = false;
                error.password = '*Password Should contain lowercase.';
            }
            if (!pass.match(/^.*(?=.*[A-Z]).*$/)) {
                formIsValid = false;
                error.password = '*Password Should contain uppercase.';
            }
            if (pass.length < 6) {
                formIsValid = false;
                error.password = '*Password Should be atlease 6 character.';
            }
        }
        if (!password) {
            formIsValid = false;
            error.password = '*Please enter your password.';
        }
        this.setState({
            error: error,
        });
        //document.getElementById("fname").focus();
        return formIsValid;
    }
    forgot() {
        let dataSet = this.validate();
        if (dataSet === true) {
            alert('Password change successfully');
            this.props.navigation.navigate('LoginScreen');
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('./images/become-bg.jpg')}
                style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    {this.state.check == false ?
                        <View style={styles.conetntWrap}>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.inputIcon}
                                    source={require('./images/user-icon.png')}
                                />
                                <Item style={styles.inputItem} floatingLabel>
                                    <Label style={styles.flotLab}>Email</Label>
                                    <Input
                                        style={styles.inputs}
                                        onChangeText={username => {
                                            this.setState({ fields: username });
                                        }}
                                        keyboardType="email-address"
                                    />
                                </Item>
                            </View>
                            <View>
                                <Text style={styles.errorMsg}>{this.state.errors.fields}</Text>
                            </View>
                            <View style={styles.btnwrap}>
                                <TouchableOpacity style={styles.otpBtn} onPress={this.submit.bind(this)}>
                                    <Text style={{ color: '#fff', fontSize: 16, }} >Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : [
                            (this.state.checkotp == false ?
                                <View style={styles.conetntWrap} key='0'>
                                    <Text style={styles.becomeHeader}>
                                        An OTP sent to your email id
                                </Text>

                                    <View style={styles.otpContainer}>
                                        <OTPInputView
                                            style={{ width: '100%', height: 200 }}
                                            onCodeChanged={val => {
                                                this.setState({ otp: val })
                                            }}
                                            autoFocusOnLoad
                                            codeInputFieldStyle={styles.underlineStyleBase}
                                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        />
                                    </View>

                                    <View style={styles.btnwrap}>
                                        <TouchableOpacity style={styles.otpBtn} onPress={this.submitOTP.bind(this)}>
                                            <Text style={{ color: '#fff', fontSize: 16, }} >Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={styles.conetntWrap}>
                                    <View style={styles.inputContainer}>
                                        <Image
                                            style={styles.inputIcon}
                                            source={require('./images/password-icon.png')}
                                        />
                                        <Item style={styles.inputItem} floatingLabel>
                                            <Label style={styles.flotLab}>Enter New Password</Label>
                                            <Input
                                                style={styles.inputs}
                                                onChangeText={username => {
                                                    this.setState({ password: username });
                                                }}
                                                keyboardType="email-address"
                                            />
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={styles.errorMsg}>{this.state.error.password}</Text>
                                    </View>
                                    <View style={styles.btnwrap}>
                                        <TouchableOpacity style={styles.otpBtn} onPress={this.forgot.bind(this)}>
                                            <Text style={{ color: '#fff', fontSize: 16, }} >Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        ]
                    }
                </View>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: '-apple-system, BlinkMacSystemFont Segoe UI',
        justifyContent: 'center',
        alignItems: 'center',
    },

    otpContainer: {
        width: '95%',
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#fff',
        borderRadius: 0,
        borderBottomWidth: 1,
        width: '95%',
        height: 45,
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 5,
        justifyContent: 'center',
    },
    inputs: {
        height: 45,
        marginRight: 0,
        borderBottomColor: '#000',
        flex: 1,
        color: '#fff',
        fontSize: 13,
    },

    otpBtn: {
        width: 170,
        height: 50,
        backgroundColor: '#ff4a67',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 20,
    },

    btnwrap: {
        justifyContent: 'space-around',
    },

    inputItem: {
        width: '90%',
    },
    flotLab: { lineHeight: 10, color: '#fff', fontSize: 13 },
    conetntWrap: {
        borderColor: '#070707',
        borderWidth: 1,
        padding: 15,
        backgroundColor: 'rgba(25, 25, 25, 0.7)',
        borderRadius: 10,
    },
    becomeHeader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    becomeCont: { padding: 20, marginTop: 30 },

    borderStyleBase: {
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: '#03DAC6',
    },

    underlineStyleBase: {
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
    errorMsg: {
        textAlign: 'left',
        color: '#ff4a67',
        marginLeft: 100,
    },
});

export default ForgotPassword;

