
insert into user (idUser, username, password, address) values (1, 'user1', 'pw1', 'addr1'), (2, 'user2', 'pw2', 'addr2'), (3, 'user3', 'pw3', 'addr3');
insert into ingredient (name, brand) values ('apple', 'orgfarm'), ('pear', 'orgfarm'), ('carrot', 'orgfarm'), ('sugar', 'quaker'), ('flour', 'quaker'), ('butter', 'dairylane'), ('milk', 'orgfarm');
insert into recipe (idRecipe, name,  servingSize, userIDref) values (1, 'apple pie', 4, 1), (2, 'pear cobbler', 4, 2);
insert into recipe_description (recipeIDref, wordCount, textBody) values (1, 10, 'Put the apple, sugar, flour and butter into pan and cook. '), (2, 12, 'SMASH THE PEAR, then but the other ingredients in');
insert into recipe_uses_ingredient (ingredientNameref, ingredientBrandref,  recipeIDref) values ('apple', 'orgfarm', 1), 
																								('sugar', 'quaker', 1),
                                                                                                ('flour', 'quaker', 1),
                                                                                                ('butter', 'dairylane', 1),
                                                                                                ('pear', 'orgfarm', 2), 
																								('sugar', 'quaker', 2),
                                                                                                ('flour', 'quaker', 2),
                                                                                                ('butter', 'dairylane', 2)