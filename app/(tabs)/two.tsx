import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axiosClient from "@/config/axiosClient";

type FormData = {
  make: string;
  model : string;
  year: string;
  clientId: string;
  workshopId: string;
  description: string;
};

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: "",
      year: "",
      make: "",
      clientId: "",
      workshopId: "",
      
    },
  });
  const onSubmit = async (data: FormData) => {
    if (image) {
      let localUri = image;
      let filename = localUri.split("/").pop() as string;

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      // as File
      formData.append("media", { uri: localUri, name: filename, type } as any);
      formData.append("description", data.description);
      formData.append("make", data.make);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("clientId", data.clientId);
      formData.append("workshopId", data.workshopId);

      console.log(formData);

      try {
        await fetch("http://192.168.1.29:3000/api/appointment", 
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });
        
      } catch (error) {
        console.error(error);
      }

    }
  };

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex flex-col justify-center items-center pt-12 bg-[#030418] flex-1">
      <Text className="text-white text-3xl font-bold mb-4">
        Description of the problem
      </Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-64 h-10 border-2 border-gray-300 rounded-lg px-2 mb-4 text-white placeholder-white"
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      {errors.description && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-64 h-10 border-2 border-gray-300 rounded-lg px-2 mb-4 text-white placeholder-white"
            placeholder="Make"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="make"
      />
      {errors.make && <Text>Make is too long.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-64 h-10 border-2 border-gray-300 rounded-lg px-2 mb-4 text-white placeholder-white"
            placeholder="Model"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="model"

      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-64 h-10 border-2 border-gray-300 rounded-lg px-2 mb-4 text-white placeholder-white"
            placeholder="Year"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="year"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-64 h-10 border-2 border-gray-300 rounded-lg px-2 mb-4 text-white placeholder-white"
            placeholder="Client ID"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="clientId"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-64 h-10 border-2 border-gray-300 rounded-lg px-2 mb-4 text-white placeholder-white"
            placeholder="Workshop ID"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="workshopId"
      />


      <Button title="Pick an image from camera roll" onPress={pickImage} />

      {image && (
        <Image source={{ uri: image }} style={styles.image} className="mb-4" />
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
