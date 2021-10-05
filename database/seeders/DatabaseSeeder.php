<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Address;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Item;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $user = User::factory()->create([
            'name' => 'Igor Banjac',
            'email' => 'igor.banjac91@gmail.com',
            'password' => 'password'
        ]);

        $user_address = Address::factory()->create([
            'name' => '19 Union Terrace',
            'city' => 'London',
            'post_code' => 'E1 3EZ',
            'country' => 'United Kingdom'
        ]);

        $user->addresses()->save($user_address);
        
        // First Invoice 

        $customer = Customer::factory()->create([
            'name' => 'Jensen Huang',
            'email' => 'jensenh@gmail.com'
        ]);

        $customer_address = Address::factory()->create([
            'name' => '106 Kendell Street',
            'city' => 'Sharringtion',
            'post_code' => 'NR24 5WQ',
            'country' => 'United Kingdom'
        ]);

        $customer->addresses()->save($customer_address);

        $invoice_1 = Invoice::factory()->create([
            'description' => "Re-branding",
            'payment_term' => 1,
            'status' => 'paid',
            'user_id' => $user->id,
            'customer_id' => $customer->id
        ]);


    
        $item = Item::factory()->create([
            'name' => "Brand Guidelines",
            'price' => 1800.9]);

        $invoice_1->items()->save($item, ['quantity' => 1]);

        // Second Invoice 

        $customer = Customer::factory()->create([
            'name' => 'Alex Grim',
            'email' => 'alexgrim@gmail.com'
        ]);

        $customer_address = Address::factory()->create([
            'name' => '84 Church Qay',
            'city' => 'Bradford',
            'post_code' => 'BD1 9PB',
            'country' => 'United Kingdom'
        ]);

        $customer->addresses()->save($customer_address);

        $invoice_1 = Invoice::factory()->create([
            'description' => "Graphic Design",
            'payment_term' => 30,
            'status' => 'pending',
            'user_id' => $user->id,
            'customer_id' => $customer->id
        ]);


    
        $item = Item::factory()->create([
            'name' => "Banner Design",
            'price' => 156.00]);
            
            
        $item_2 = Item::factory()->create([
            'name' => "Email Design",
            'price' => 400.00]);
            
        $invoice_1->items()->save($item_2, ['quantity' => 2]);
        $invoice_1->items()->save($item, ['quantity' => 1]);

        // Third Invoice 

        $customer = Customer::factory()->create([
            'name' => 'John Morrison ',
            'email' => 'johnmorrison@gmail.com'
        ]);

        $customer_address = Address::factory()->create([
            'name' => '79 Dove Road',
            'city' => 'Westhall',
            'post_code' => 'IP19 3PF',
            'country' => 'United Kingdom'
        ]);

        $customer->addresses()->save($customer_address);

        $invoice_1 = Invoice::factory()->create([
            'description' => "Website Redesign",
            'payment_term' => 7,
            'status' => 'paid',
            'user_id' => $user->id,
            'customer_id' => $customer->id
        ]);


    
        $item = Item::factory()->create([
            'name' => "Website Redesign",
            'price' => 14002.33]);

        $invoice_1->items()->save($item, ['quantity' => 1]);

        // Fourth Invoice 

        $customer = Customer::factory()->create([
            'name' => 'Alysa Werner',
            'email' => 'alysawerner@gmail.com'
        ]);

        $customer_address = Address::factory()->create([
            'name' => '63 Warwick Road',
            'city' => 'Carlisle',
            'post_code' => 'CA20 2TG',
            'country' => 'United Kingdom'
        ]);

        $customer->addresses()->save($customer_address);

        $invoice_1 = Invoice::factory()->create([
            'description' => "Logo Concept",
            'payment_term' => 1,
            'status' => 'pending',
            'user_id' => $user->id,
            'customer_id' => $customer->id
        ]);


    
        $item = Item::factory()->create([
            'name' => "Logo Skethces",
            'price' => 102.04]);

        $invoice_1->items()->save($item, ['quantity' => 1]);

        // Fifth Invoice 

        $customer = Customer::factory()->create([
            'name' => 'Mellisa Clarke',
            'email' => 'mellisaclarke@gmail.com'
        ]);

        $customer_address = Address::factory()->create([
            'name' => '46 Abbey Row',
            'city' => 'Cambridge',
            'post_code' => 'CB5 6EG',
            'country' => 'United Kingdom'
        ]);

        $customer->addresses()->save($customer_address);

        $invoice_1 = Invoice::factory()->create([
            'description' => "Re-branding",
            'payment_term' => 7,
            'status' => 'pending',
            'user_id' => $user->id,
            'customer_id' => $customer->id
        ]);


        $item = Item::factory()->create([
            'name' => "New Logo",
            'price' => 2500.00]);
    
        $item_2 = Item::factory()->create([
            'name' => "Brand Guidelines",
            'price' => 2500.00]);

        $invoice_1->items()->save($item, ['quantity' => 1]);
        $invoice_1->items()->save($item_2, ['quantity' => 1]);

        // Sixth Invoice 

        $customer = Customer::factory()->create([
            'name' => 'Thoman Wayne',
            'email' => 'thomanwayne@gmail.com'
        ]);

        $customer_address = Address::factory()->create([
            'name' => '3964 Queens Lane',
            'city' => 'Gotham',
            'post_code' => '60457',
            'country' => 'United States of America'
        ]);

        $customer->addresses()->save($customer_address);

        $invoice_1 = Invoice::factory()->create([
            'description' => "Landing Page Design",
            'payment_term' => 30,
            'status' => 'pending',
            'user_id' => $user->id,
            'customer_id' => $customer->id
        ]);


    
        $item = Item::factory()->create([
            'name' => "Web Design",
            'price' => 6155.91]);

        $invoice_1->items()->save($item, ['quantity' => 1]);

        // Seventh Invoice 

        $customer = Customer::factory()->create([
            'name' => 'Anita Wainwright',
            'email' => 'anitawainwright@gmail.com'
        ]);

        $customer_address = Address::factory()->create([
            'name' => '',
            'city' => '',
            'post_code' => '',
            'country' => ''
        ]);

        $customer->addresses()->save($customer_address);

        $invoice_1 = Invoice::factory()->create([
            'description' => "Logo Re-design",
            'payment_term' => 7,
            'status' => 'draft',
            'user_id' => $user->id,
            'customer_id' => $customer->id
        ]);


    
        $item = Item::factory()->create([
            'name' => "Logo Re-design",
            'price' => 6155.91]);

        $invoice_1->items()->save($item, ['quantity' => 1]);
    }
}
