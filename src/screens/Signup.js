// import React, { useState } from "react";
// import { firebase } from "../firebase/config";
// // import Home from '../Home/Home';

// import {
//   StyleSheet,
//   View,
//   Image,
//   Text,
//   TextInput,
//   Button,
//   TouchableOpacity,
// } from "react-native";
// import {
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   ScrollView,
//   Platform,
//   Keyboard,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// export default class SignUp extends React.Component {
//   state = { email: "", password: "", confirmPassword:"",errorMessage: null };
//   handleSignUp = () => {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(
//         this.state.email,
//         this.state.password,
//         this.state.confirmPassword
//       )
//       .then(() => this.props.navigation.navigate("Mais"))
//       .catch((error) => this.setState({ errorMessage: error.message }));
//   };
//   render() {
//     return (
//       <KeyboardAwareScrollView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={{ backgroundColor: "#fff", flex: 1 }}>
//             <View style={{ backgroundColor: "white", flex: 3 }}>
//               <View>
//                 <Image
//                   source={require("../../assets/l.png")}
//                   style={{ width: 250, height: 290, alignSelf: "center" }}
//                 ></Image>
//               </View>
//             </View>
//             <View style={{ backgroundColor: "#8fbc8f", flex: 4 }}>
//               <Text></Text>
//               <Text
//                 style={{
//                   color: "white",
//                   alignItems: "center",
//                   fontFamily: "Verdana-BoldItalic",
//                   fontSize: 17,
//                 }}
//               >
//                 {" "}
//                 CREATE YOUR ACCOUNT
//               </Text>
//               <Text
//                 style={{
//                   color: "white",
//                   alignItems: "center",
//                   fontFamily: "Verdana-BoldItalic",
//                   fontSize: 15,
//                 }}
//               >
//                 {" "}
//                 TO JOIN OUR ERTEHAL FAMILY{" "}
//               </Text>

//               <View style={styles.inner}>
//                 <TextInput
//                   style={styles.input}
//                   placeholderTextColor="#aaaaaa"
//                   placeholder="E-mail"
//                   onChangeText={(email) => this.setState({ email })}
//                   value={this.state.email}
//                   underlineColorAndroid="transparent"
//                   autoCapitalize="none"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholderTextColor="#aaaaaa"
//                   secureTextEntry
//                   placeholder="Password"
//                   onChangeText={(password) => this.setState({ password })}
//                   value={this.state.password}
//                   underlineColorAndroid="transparent"
//                   autoCapitalize="none"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholderTextColor="#aaaaaa"
//                   secureTextEntry
//                   placeholder="Confirm Password"
//                   onChangeText={(confirmPassword) =>
//                     this.setState({ confirmPassword })
//                   }
//                   value={this.state.confirmPassword}
//                   underlineColorAndroid="transparent"
//                   autoCapitalize="none"
//                 />
//                 <Text></Text>

//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={this.handleSignUp}
//                 >
//                   <Text style={styles.buttonTitle}>SIGN UP</Text>
//                 </TouchableOpacity>
//                 <Text></Text>

//                 <View style={styles.footerView}>
//                   <Text style={styles.footerText}>
//                     Already got an account?{" "}
//                     <Text
//                       onPress={() => this.props.navigation.navigate("Login")}
//                     >
//                       LOG IN
//                     </Text>
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAwareScrollView>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     color: "green",
//     backgroundColor: "green",
//   },
//   input: {
//     width: 350,
//     height: 40,
//     backgroundColor: "white",
//     margin: 10,
//     padding: 8,
//     color: "black",
//     borderRadius: 14,
//     fontSize: 18,
//     fontWeight: "500",
//     alignSelf: "center",
//   },

//   button: {
//     backgroundColor: "#2f4f4f",
//     width: 100,
//     height: 40,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   },
//   buttonTitle: {
//     color: "white",
//     fontSize: 18,
//   },
//   footerText: {
//     fontSize: 16,
//     color: "#2e2e2d",
//     alignSelf: "center",
//     borderRadius: 14,
//   },
//   inner: {
//     padding: 60,
//     flex: 1,
//     justifyContent: "space-around",
//   },
//   footerLink: {
//     color: "#788eec",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
// });

import React, { useState } from 'react'
import * as firebase from 'firebase';
import '@firebase/firestore'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'



const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    //const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const onSignup = async () => {

        // if (!name) {
        //     setError('Please enter your Full name')
        //     return
        // }

        if (rePassword !== password) {
            setError('Passwords don\'t match. Please make reEnter your Password')
            return
        }

        setIsLoading(true)

        const date = new Date

        try {
            const res = await firebase.auth()
                .createUserWithEmailAndPassword(email.trim(), password)
            // const saveRes = await firebase.database().ref('users/' + res.user.uid).set({
            //     name: name.trim(),
            //     email: email.trim(),
            //     createdAt: new Date().toJSON().slice(0, 10),
            //     isActive: true,
            //     isBannd: false
            // });
            const dbRes = await firebase.firestore().collection('users')
                .doc(res.user.uid).set({
                    //name: name.trim(),
                    email: email.trim(),
                    createdAt: new Date().toJSON().slice(0, 10),
                    isActive: true,
                    isBannd: false
                })
            console.log('hello')
            setIsLoading(false)
            // navigation.navigate('Loading')
        } catch (e) {
            setIsLoading(false)
            setError(e.message)
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.viewOne} >
                <Image
                    source={require("../../assets/l.png")}
                    style={styles.img}
                />
                {isLoading ? <ActivityIndicator size='large' /> : null}
                <Text style={styles.title}>SignUp</Text>
            </View>
            <View style={styles.viewTwo}>
                {error ? <Text style={styles.err}>{error}</Text> : null}
                <TextInput
                    editable={isLoading ? false : true}
                    placeholder='Email'
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    editable={isLoading ? false : true}
                    placeholder='Password'
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    editable={isLoading ? false : true}
                    placeholder='Re-Password'
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={rePassword}
                    onChangeText={setRePassword}
                />
                <TouchableOpacity
                    onPress={onSignup}
                >
                    <Text style={styles.btn}>Create an Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.text}>Already have an Account..</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        alignContent: 'center',
        flex: 1
    },
    img: {
        width: '100%',
        resizeMode: 'center',
        width: 180,
        flex: 1,
        marginTop: 20
    },
    viewTwo: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#8CBF8B',
        padding: 10
    },
    viewOne: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#085C06',
        marginBottom: 10,
    },
    input: {
      width: 350,
          height: 60,
          backgroundColor: "white",
          margin: 10,
          padding: 8,
          color: "black",
          borderRadius: 14,
          fontSize: 18,
          fontWeight: "500",
          alignSelf: "center",
    },
    btn: {
        fontSize: 26,
        backgroundColor: '#085C06',
        padding: 10,
        color: 'white',
        borderRadius: 10,
        width: 300,
        textAlign: 'center',
        marginTop: 10
    },
    text: {
        fontWeight: 'bold',
        color: '#085C06'
    },
    err: {
        color: 'red',
        textAlign: 'center',
        alignSelf: 'center'
    },
    
})


export default SignupScreen