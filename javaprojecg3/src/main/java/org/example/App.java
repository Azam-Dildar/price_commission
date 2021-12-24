package org.example;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicBoolean;


public class App
{


    // Product Class that will store the data to the Data base using hybernate
    public static class Proudct{

        private String Name , Price , Image , Link;

        public Proudct(String name, String price, String image, String link) {
            Name = name;
            Price = price;
            Image = image;
            Link = link;
        }

        public String getName() {
            return Name;
        }

        public void setName(String name) {
            Name = name;
        }

        public String getPrice() {
            return Price;
        }

        public void setPrice(String price) {
            Price = price;
        }

        public String getImage() {
            return Image;
        }

        public void setImage(String image) {
            Image = image;
        }

        public String getLink() {
            return Link;
        }

        public void setLink(String link) {
            Link = link;
        }
    }







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

        Connection conn = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:33060/price_comparison", "root", "password");
        Statement stmt = conn.createStatement();

        int rs = stmt.executeUpdate("INSERT into websites_table(site_name  , site_url ) values( ALIBABA "+url+  ") where( NOT EXISTS(SELECT site_url from websites_table))");
        for(int i=0 ; i< P_Name.size() ; i++)
        {
            int resultSet = stmt.executeUpdate("Insert into mobile_data_table (mobile_model ,mobile_price ,  mobile_image, site_id) values("+P_Name.get(i)+", "+P_Price.get(i)+", "+P_Images.get(i)+" , SELECT site_id from websites_table where site_url = "+url+")");
        }



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






        Connection conn = (Connection)DriverManager.getConnection("jdbc:mysql://localhost:3306/price_comparison", "root", "password");



        Statement stmt = conn.createStatement();



//        int rs = stmt.executeUpdate("INSERT INTO websites_table" + " VALUES(" + " 'Name' , 'URL'`) ");


        int rs = stmt.executeUpdate("INSERT into websites_table(site_name  , site_url ) values( ALIBABA "+url+  ") where( NOT EXISTS(SELECT site_url from websites_table))");

        for(int i =0 ; i< Names.size() ; i++)
        {

            int status = stmt.executeUpdate("Insert into mobile_data_table (mobile_model ,mobile_price ,  mobile_image, site_id) values("+Names.get(i)+", "+PricesList.get(i)+", "+Images.get(i)+" , SELECT site_id from websites_table where site_url = "+url+")");
        }




    }
    public static void main( String[] args )throws  Exception
    {

        getHtmlAmazone();
        getHtmlAliBaba();



    }
}
