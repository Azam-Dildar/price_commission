package org.example;

import org.json.simple.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.awt.*;
import java.io.File;
import java.io.FileWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicBoolean;

public class App
{
    public static void getHtmlAliBaba() throws  Exception{

        String url = "https://www.alibaba.com//trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=IPhone";
        Document doc = Jsoup.connect(url).get();


        LinkedList<String> P_Name , P_Price , P_Images;

        P_Name = new LinkedList<>();
        P_Price = new LinkedList<>();
        P_Images = new LinkedList<>();

        Elements Names = doc.select(".elements-title-normal__outter");

        Names.forEach( (e)->{

            P_Name.add(e.text());


        });

        Elements Prices = doc.select(".elements-offer-price-normal__price");
        Prices.forEach( (e)->{

            P_Price.add(e.text());
        }) ;


        Elements Images = doc.select(".J-img-switcher-item");
        Images.forEach( (e)->{

            P_Images.add(e.attr("src"));

        });


        for(int i=0 ; i<P_Name.size() ; i++)
        {
            P_Images.add(i , P_Images.get(0));
        }

        Connection conn = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/price_comparison", "root", "password");
        Statement stmt = conn.createStatement();

//        String query = "INSERT INTO websites_table (site_name, site_url) VALUES (?, ?)";
//
//        PreparedStatement preparedStmt = conn.prepareStatement(query);
//        preparedStmt.setString (1, "Ali Baba");
//        preparedStmt.setString (2, url);
//        preparedStmt.execute();

        String query2 = "INSERT INTO mobile_data_table (mobile_model, mobile_price, mobile_image, site_url, site_name) VALUES (?, ?, ?, ?, ?)";

        for(int i=0 ; i< P_Name.size() ; i++)
        {
            PreparedStatement preparedSt = conn.prepareStatement(query2);
            preparedSt.setString (1, P_Name.get(i));
            preparedSt.setString (2, P_Price.get(i));
            preparedSt.setString(3, P_Images.get(i));
            preparedSt.setString(4, "Ali baba");
            preparedSt.setString(5, url);
            preparedSt.execute();

        }

//        for(int i =0 ; i < P_Name.size() ; i++) {
//            JSONObject Product = new JSONObject();
//            Product.put("MobileName", P_Name.get(i));
//            Product.put("Price", P_Price.get(i));
//            Product.put("image", P_Images.get(i));
//            Product.put("url", url);
//
//            JSONObject ProductObject = new JSONObject();
//            ProductObject.put("Product", Product);
//
//
//            //Write JSON file
//            FileWriter file = new FileWriter("Products.json"); // Or you can give a path to store on another plce
//            //We can write any  JSONObject instance to the file
//            file.write(ProductObject.toJSONString());
//            file.flush();
////
////        } catch (IOException e) {
////            e.printStackTrace();
////        }
//        }
    }

    public  static void getHtmlAmazone() throws Exception {

        String url = "https://www.amazon.co.uk/s?k=iphone&rh=n%3A356496011&ref=nb_sb_noss";

        Document doc = Jsoup.connect(url).get();


        LinkedList<String> Names , PricesList , Images;

        Names = new LinkedList<>();
        PricesList = new LinkedList<>();
        Images = new LinkedList<>();

        // This is for the Names of the Phones
        Elements Phones = doc.select(".a-size-base-plus");

        Phones.forEach( (e)->{
            if(e.html().toString().contains("Apple"))
            {
                Names.add(e.html().toString());
            }
        });



        // This is the code for the prices
        // Finding the prices
        Elements Prices = doc.select(".a-offscreen");
        Prices.forEach( (e->{
            PricesList.add(e.text());

        }));


        // Selecting the image
        AtomicBoolean flag = new AtomicBoolean(false);
        Elements Photos = doc.select(".s-image");
        Photos.forEach( (e)->{

            if(flag.get())
                Images.add(e.attr("src").toString());
            else
                flag.set(true);

        });

        Connection conn = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/price_comparison", "root", "password");
        Statement stmt = conn.createStatement();

//        String query = "INSERT INTO websites_table (site_name, site_url) VALUES (?, ?)";
//
//        PreparedStatement preparedStmt = conn.prepareStatement(query);
//        preparedStmt.setString (1, "Amazon");
//        preparedStmt.setString (2, url);
//        preparedStmt.execute();

        String query2 = "INSERT INTO mobile_data_table (mobile_model, mobile_price, mobile_image, site_url, site_name) VALUES (?, ?, ?, ?, ?)";

        for(int i=0 ; i< Images.size() ; i++)
        {
            PreparedStatement preparedSt = conn.prepareStatement(query2);
            preparedSt.setString (1, Names.get(i));
            preparedSt.setString (2, PricesList.get(i));
            preparedSt.setString(3, Images.get(i));
            preparedSt.setString(4, "Amazon");
            preparedSt.setString(5, "url");
            preparedSt.execute();

        }



//        for(int i =0 ; i < Images.size() ; i++)
//        {
//            JSONObject Product = new JSONObject();
//            Product.put("MobileName", Names.get(i));
//            Product.put("Price", PricesList.get(i));
//            Product.put("image", Images.get(i));
//
//            Product.put("url",url);
//
//            JSONObject ProductObject = new JSONObject();
//            ProductObject.put("Product", Product);
//
//            //Write JSON file
//            FileWriter file = new FileWriter("Products.json"); // Or you can give a path to store on another plce
//            //We can write any  JSONObject instance to the file
//            file.write(ProductObject.toJSONString());
//            file.flush();
//        }




    }
    public static void main( String[] args )throws  Exception
    {

        getHtmlAmazone();
        getHtmlAliBaba();
    }

}
