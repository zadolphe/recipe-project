
insert into cuisine (type, regionalInfo, notableDIshes) values ('Sri Lankan', 'South Asian', 'Lentil Curry'), ('Italian', 'Mediterranean', 'Cacio e Pepe'), ('French', 'European', 'Croque Madame'), ('Mexican', 'Central American', 'Salsa');
insert into user (idUser, username, password, address) values (1, 'LovesToCook123', 'pastaword', '10 5th Ave'), (2, 'FeedMe', 'omnomnom', '7 9th Ave'), (3, 'Foodie2022', '123456', '41 12th St'), (null, 'GordonShamsay', 'itwasin04', '123 4th St'), (null, 'ChuliaJild', 'buttermeup', '20 6th Ave'), (null, 'CookBot', 'beepboop', '10 10th St');
insert into grocery_store (address, name, generalManager) values ('5 5th Ave' , 'Boyds Supermarket', 'Robert Boyd'), ('3 6th St' , 'Panella', 'Sofia Patitucci'), ('17 35th St', 'Everyday Shopping', 'Rajpal Singh'), ('42 7th Ave' , 'Exotic Import Store', 'Djambi');
insert into ingredient (name, brand) values ('apple', 'orgfarm'), ('pear', 'orgfarm'), ('carrot', 'orgfarm'), ('milk', 'orgfarm'),
											('sugar', 'quaker'), ('flour', 'quaker'), ('salt', 'quaker'), ('milk', 'quaker'),
                                            ('butter', 'dairylane'), ('egg', 'dairylane'), ('cream', 'dairylane'), ('milk', 'dairylane'),
                                            ('egg', 'oldmacdonalds'), ('cream', 'oldmacdonalds'), ('lemon', 'oldmacdonalds'),
                                            ('almond', 'rancher'), ('cherry', 'rancher'), ('pineapple', 'rancher'),
                                            ('marshmallow', 'fields'),
                                            ('oil', 'exoticimports'), ('spice mix', 'exoticimports'), ('yellow lentil', 'exoticimports'), ('red lentil', 'exoticimports'), ('coconut milk', 'exoticimports');

insert into recipe (idRecipe, name,  servingSize, userIDref) values (1, 'Apple Pie', 4, 1), (2, 'Pear Cobbler', 4, 2), (17, 'Twenty-Four Hour Salad', 6, 1), (18, 'Apple', 1, 4), (19, 'Red Lentil Curry', 3, 6);

insert into recipe_description (recipeIDref, wordCount, textBody) values (1, 11, 'Put the apple, sugar, flour, and butter into pan and cook.'),
																		 (2, 9, 'SMASH THE PEAR, then put the other ingredients in'),
                                                                         (17, 51, 'Cook 2 egg yolks, 1/4c sugar, 1/4c cream, juice of 2 lemons, and 1/8t salt in double boiler, stirring constantly till thick. Then add some diced pineapple and pitted cherries (as desired), 1c shredded almonds, marshmallows (as desired), and 1c whipped cream. Chill in fridge for 24 hours and then serve.'),
                                                                         (18, 6, 'Grab an apple. Eat yo apple!'),
                                                                         (19, 3, 'Heat 3T oil in saucepan. Add 2t spices. Stir in 2c lentils. Add 4c boiling water. Simmer for 10 minutes. Stir in 1c coconut milk. Add robo-pinch of salt. Serve.');
                                                                         
insert into recipe_uses_ingredient (ingredientNameref, ingredientBrandref,  recipeIDref) values ('apple', 'orgfarm', 1), 
																								('sugar', 'quaker', 1),
                                                                                                ('flour', 'quaker', 1),
                                                                                                ('butter', 'dairylane', 1),
                                                                                                ('pear', 'orgfarm', 2), 
																								('sugar', 'quaker', 2),
                                                                                                ('flour', 'quaker', 2),
                                                                                                ('butter', 'dairylane', 2),
                                                                                                ('egg', 'oldmacdonalds', 17),
                                                                                                ('sugar', 'quaker', 17),
                                                                                                ('cream', 'oldmacdonalds', 17),
                                                                                                ('lemon', 'oldmacdonalds', 17),
                                                                                                ('salt', 'quaker', 17),
                                                                                                ('pineapple', 'rancher', 17),
                                                                                                ('cherry', 'rancher', 17),
                                                                                                ('almond', 'rancher', 17),
                                                                                                ('marshmallow', 'fields', 17),
                                                                                                ('apple', 'orgfarm', 18),
                                                                                                ('oil', 'exoticimports', 19),
                                                                                                ('red lentil', 'exoticimports', 19),
                                                                                                ('spice mix', 'exoticimports', 19),
                                                                                                ('coconut milk', 'exoticimports', 19),
                                                                                                ('salt', 'quaker', 19);

insert into user_favorites_recipe (userIDref, recipeIDref) values (1, 2), (3, 17), (4, 17), (4, 1), (3, 2); -- ENSURE UNIQUE;
insert into review (idReview, userIDref, recipeIDref, reviewText, dateUploaded, rating) values (null, 5, 18, 'This is the most low-effort post I have ever seen... disgraceful!', null, 1),
																							   (null, 4, 17, 'Nice recipe, yo!', null, 5); -- ENSURE UNIQUE;

insert into recipe_inspiredby_cuisine (recipeIDref, cuisineTyperef) values (19, 'Sri Lankan');

insert into basket (idbasket, totalPrice, numIngredients, userIDref) values (1, 3.69, 3, 1), (2, 0.00, 0, 2), (3, 5.10, 1, 3);
insert into basket_filled_with_ingredient (basketIDref, ingredientNameref, ingredientBrandred) values (1, 'apple', 'orgfarm'), (1, 'oil', 'exoticimports'), (1, 'salt', 'quaker'),
																									  (3, 'almond', 'rancher');

insert into grocery_features_cuisine (groceryAddressref, cuisineTyperef) values ('5 5th Ave', 'Italian'), ('5 5th Ave', 'French'),
																				('3 6th St', 'Italian'),
                                                                                ('17 35th St', 'Mexican'), ('17 35th St', 'Italian'),
                                                                                ('42 7th Ave', 'Sri Lankan');
insert into grocery_stocks_ingredient (ingredientNameref, ingredientBrandref, groceryAddressref, price, quantity) values ('apple', 'orgfarm', '5 5th Ave', 0.69, 1), ('pear', 'orgfarm', '5 5th Ave', 0.82, 1), ('milk', 'orgfarm', '5 5th Ave', 3.75, 1),
																														 ('sugar', 'quaker', '5 5th Ave', 3.10, 1), ('flour', 'quaker', '5 5th Ave', 2.85, 1), ('salt', 'quaker', '5 5th Ave', 1.25, 1),
                                                                                                                         ('almond', 'rancher', '5 5th Ave', 5.10, 1), ('cherry', 'rancher', '5 5th Ave', 4.20, 1),
                                                                                                                         ('butter', 'dairylane', '5 5th Ave', 3.05, 1),
                                                                                                                         ('egg', 'oldmacdonalds', '5 5th Ave', 4.65, 12),
                                                                                                                         ('oil', 'exoticimports', '5 5th Ave', 1.75, 1),
                                                                                                                         ('sugar', 'quaker', '3 6th St', 4.15, 1), ('flour', 'quaker', '3 6th St', 3.33, 1), ('salt', 'quaker', '3 6th St', 1.50, 1), ('milk', 'quaker', '3 6th St', 3.42, 1),
                                                                                                                         ('butter', 'dairylane', '3 6th St', 3.10, 1), ('egg', 'dairylane', '3 6th St', 6.45, 12), ('cream', 'dairylane', '3 6th St', 3.97, 1),
                                                                                                                         ('oil', 'exoticimports', '3 6th St', 2.99, 1),
                                                                                                                         ('apple', 'orgfarm', '17 35th St', 0.66, 1), ('pear', 'orgfarm', '17 35th St', 0.80, 1), ('carrot', 'orgfarm', '17 35th St', 0.42, 1), ('milk', 'orgfarm', '17 35th St', 3.18, 1),
                                                                                                                         ('sugar', 'quaker', '17 35th St', 2.97, 1), ('flour', 'quaker', '17 35th St', 2.65, 1), ('salt', 'quaker', '17 35th St', 1.29, 1),
                                                                                                                         ('butter', 'dairylane', '17 35th St', 3.00, 1), ('milk', 'dairylane', '17 35th St', 3.40, 1),
                                                                                                                         ('egg', 'oldmacdonalds', '17 35th St', 4.80, 12), ('cream', 'oldmacdonalds', '17 35th St', 4.40, 1), ('lemon', 'oldmacdonalds', '17 35th St', 1.23, 1),
                                                                                                                         ('almond', 'rancher', '17 35th St', 4.70, 1), ('cherry', 'rancher', '17 35th St', 4.19, 1), ('pineapple', 'rancher', '17 35th St', 2.65, 1),
																														 ('marshmallow', 'fields', '17 35th St', 4.20, 1), 
                                                                                                                         ('coconut milk', 'exoticimports', '17 35th St', 7.80, 1),
                                                                                                                         ('oil', 'exoticimports', '42 7th Ave', 2.60, 1), ('spice mix', 'exoticimports', '42 7th Ave', 6.83, 1), ('yellow lentil', 'exoticimports', '42 7th Ave', 2.30, 1), ('red lentil', 'exoticimports', '42 7th Ave', 2.50, 1), ('coconut milk', 'exoticimports', '42 7th Ave', 8.10, 1);

